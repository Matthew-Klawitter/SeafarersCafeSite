const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const crypto = require('crypto');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        var ext = "";
        if (file.originalname.includes(".")) {
            ext = "." + file.originalname.split(".")[1];
        }
        return cb(null, 'img-' + Date.now() + ext)
    }
})
var upload = multer({ storage: storage })

const server = express();
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }));

function listen(port) {
    server.listen(port, () => console.info(`Listening on port ${port}!`));
}

function setUpRoutes(models, jwtFunctions, database) {
    // Authentication routine
    server.use(function (req, res, next) {
        if (req.path.startsWith("/admin")) {
            let cookie = req.cookies.authorization
            if (!cookie) {
                console.debug("Redirecting to login - no cookie")
                res.redirect('/login');
                return;
            }
            try {
                const decryptedUserId = jwtFunctions.verify(cookie);
                models.users.findOne({ where: { username: decryptedUserId } }).then((user, error) => {
                    if (user) {
                        res.locals.user = user.get({ plain: true });
                    } else {
                        console.debug("Redirecting to login - invalid cookie")
                        res.redirect('/login');
                        return;
                    }
                });
            } catch (e) {
                res.status(400).send(e.message);
            }
        }
        next();
    })

    // Route logging
    server.use(function (req, res, next) {
        var request = models.requests.create({ createdAt: new Date(), ip: req.ip, method: req.method, url: req.originalUrl });
        next()
    })

    server.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/index', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/admin', (req, res) => res.sendFile(__dirname + "/html/admin.html"));
    server.get('/login', (req, res) => res.sendFile(__dirname + "/html/login.html"))
    server.get('/bread', (req, res) => res.sendFile(__dirname + "/html/bread.html"));
    server.get('/essay', (req, res) => res.sendFile(__dirname + "/html/essay.html"));
    server.get('/snake', (req, res) => res.sendFile(__dirname + "/html/snake.html"));
    server.get('/setScore', (req, res) => {
        request(`http://localhost:8000?${req.url.split("?")[1]}`, function (error, response, body) {
        });
    })
    server.get('/admin/stats', async (req, res, next) => {
        try {
            var ipResult = await database.query("SELECT ip, count(id) as c FROM requests GROUP BY ip", { type: database.QueryTypes.SELECT })
            var urlResult = await database.query("SELECT method, url, count(id) as c FROM requests GROUP BY method, url", { type: database.QueryTypes.SELECT })
            res.status(200).send({ ip: ipResult, url: urlResult });
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.get('/posts/:type', async (req, res, next) => {
        try {
            const { type } = req.params;
            var posts = await models.posts.findAll({ where: { type: type }, order: [['createdAt', 'DESC']] });
            posts = posts.map(x => x.get({ plain: true }));
            for (const post of posts) {
                const images = await models.pictures.findAll({ attributes: ["source"], where: { postId: post.id } }).map(x => x.source);
                post.images = images;
            }
            res.status(200).send(posts);
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.post('/posts', upload.array('images'), async (req, res, next) => {
        try {
            const type = req.body.type
            const newPost = await models.posts.create(req.body);
            req.files.forEach(async (file) => {
                await models.pictures.create({ "source": "uploads/" + file.filename, "postId": newPost.id });
                console.log("uploaded ", file.path);
            })
            console.log(newPost);
            res.redirect(`/${type}`);
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.post('/login', async (req, res, next) => {
        const hash = crypto.createHash("sha512").update(req.body.password, "binary").digest("base64");
        const user = await models.users.findOne({ where: { username: req.body.username, password: hash } })
        if (user) {
            const token = jwtFunctions.sign(user.username);
            res.cookie('authorization', token);
            console.debug("Redirecting to admin - logged in")
            res.redirect('/admin');
        } else {
            console.debug("Redirecting to login - invalid login")
            res.redirect('/login');
        }
    })


    server.get('/favicon.ico', (req, res) => res.sendFile(__dirname + "/icon/favicon.ico"))
    server.get('/css/:id', (req, res) => {
        res.sendFile(__dirname + "/css/" + req.params.id);
    });
    server.get('/uploads/:id', (req, res) => {
        res.sendFile(__dirname + "/uploads/" + req.params.id);
    });
    server.get('/essay/:id', (req, res) => {
        res.sendFile(__dirname + "/html/essay/" + req.params.id);
    });

}

module.exports = {
    listen,
    setUpRoutes
};

