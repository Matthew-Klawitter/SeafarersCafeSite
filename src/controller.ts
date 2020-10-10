const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const path = require('path');
const Op = require('sequelize').Op;
const multer = require('multer');


/*
Storage location for photo uploads
TODO: Prevent upload when disk usage reaches a specific threshold
*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/uploads/')
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


/*
Encryption methods

Utilized during user account creation
*/
function hashWithSalt(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest("base64");
};


/*
Express server that serves information based on established routing
*/
const server = express();
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }));

function listen(port) {
    server.listen(port, () => console.info(`Listening on port ${port}!`));
}


/*
Web routing management and establishment:
Implements the Express.js routing engine for serving HTML and associated data
*/
function setUpRoutes(models, jwtFunctions, database) {
    // Authentication routine
    server.use(function (req, res, next) {
        if (req.path.toLowerCase().startsWith("/admin")) {
            let cookie = req.cookies.authorization
            if (!cookie) {
                console.debug("Warning: User attempted to access administration page without an authenticated cookie! Redirecting to login.")
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
        let cookie = req.cookies.session;
        if (!cookie) {
            cookie = uuidv4();
            res.cookie('session', cookie, { expires: new Date(Date.now() + (1000 * 60 * 60)) });
        }
        models.requests.create({
            createdAt: new Date(), session: cookie, method: req.method, url: req.originalUrl
        });
        next()
    })

    // Page Routes
    server.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/index', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/admin', (req, res) => res.sendFile(__dirname + "/html/admin.html"));
    server.get('/login', (req, res) => res.sendFile(__dirname + "/html/login.html"))
    server.get('/email', (req, res) => res.sendFile(__dirname + "/html/email.html"))
    server.get('/blog', (req, res) => res.sendFile(__dirname + "/html/blog.html"));
    server.get('/tags', (req, res) => res.sendFile(__dirname + "/html/tags.html"));
    server.get('/feed', (req, res) => res.sendFile(__dirname + "/html/feed.html"));
    server.get('/aboutus', (req, res) => res.sendFile(__dirname + "/html/aboutus.html"));

    // Date Routes
    server.get('/admin/stats', async (req, res, next) => {
        try {
            var sessionResult = await database.query("SELECT session, count(id) as c FROM requests GROUP BY session HAVING c > 1", { type: database.QueryTypes.SELECT })
            var total = await database.query("select count(distinct session) as t FROM requests", { type: database.QueryTypes.SELECT })
            var urlResult = await database.query("SELECT method, url, count(id) as c FROM requests GROUP BY method, url", { type: database.QueryTypes.SELECT })
            var logResult = await database.query("SELECT createdAt, session, method, url FROM requests order by createdAt desc limit 15", { type: database.QueryTypes.SELECT })
            res.status(200).send({ total: total[0].t, session: sessionResult, url: urlResult, log: logResult });
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.get('/blog/:id', async (req, res, next) => {
        res.sendFile(__dirname + "/html/blog-single.html");
    })
    server.get('/tags/:name', async (req, res, next) => {
        console.log("TAGS/NAME");
        try {
            const { name } = req.params;
            var postsWithTag = await models.tags.findAll({ attributes: ["postId"], where: { text: name } })
            postsWithTag = postsWithTag.map(function (x) {
                return { id: x.postId }
            });
            var posts = await models.posts.findAll({
                where: {[Op.or]: postsWithTag}, order: [['createdAt', 'DESC']]
            });
            posts = posts.map(x => x.get({ plain: true }));
            await addTagsToPosts(models, posts)
            console.log(posts);
            res.status(200).send(posts);
            next();
        } catch (e) {
            console.error(e);
            res.status(400).send(e.message);
        }
    })
    server.get('/admin/posts/:type', async (req, res, next) => {
        try {
            const { type } = req.params;
            var posts = await models.posts.findAll({
                where: { type: type }, order: [['createdAt', 'DESC']]
            });
            posts = posts.map(x => x.get({ plain: true }));
            await addTagsToPosts(models, posts)
            res.status(200).send(posts);
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.post('/admin/posts', async (req, res, next) => {
        try {
            const type = req.body.type
            const newPost = await models.posts.create(req.body);
            req.body.tags.split(" ").forEach(async (tag) => {
                await models.tags.create({ "text": tag, "postId": newPost.id });
            })
            console.log(newPost);
            res.redirect(`/${type}`);
            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    })
    server.post('/login', async (req, res, next) => {
        const user = await models.users.findOne({ where: { username: req.body.username} })
        const hash = hashWithSalt(req.body.password, user.salt)
        if (user.password == hash) {
            const token = jwtFunctions.sign(user.username);
            res.cookie('authorization', token, { expires: new Date(Date.now() + (1000 * 60 * 60)) });
            console.debug("Redirecting to admin - logged in")
            res.redirect('/admin');
        } else {
            console.debug("Redirecting to login - invalid login")
            res.redirect('/login');
        }
    })

    /* Static files (css, favicon, etc.) */
    server.use(express.static(__dirname + '/public'));

    server.get('/uploads/:id', (req, res) => {
        res.sendFile(__dirname + "/uploads/" + req.params.id);
    });
}

/*
Method exports
*/
module.exports = {
    listen,
    setUpRoutes
};

