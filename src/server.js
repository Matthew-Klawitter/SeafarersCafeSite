const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        var ext = "";
        if(file.originalname.includes(".")){
            ext = "." + file.originalname.split(".")[1];
            console.log(ext);
        }
        console.log(ext);
        return cb(null, 'img-' + Date.now()+ext)
    }
  })
var upload = multer({ storage: storage })

const port = 80;

const server = express();
// server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(function (req, res, next) {
    console.debug("express:", req.method, req.originalUrl);
    next()
})


function listen(){
    server.listen(port, () => console.info(`Listening on port ${port}!`));
}

function setUpRoutes(models){
    server.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/index', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/admin', (req, res) => res.sendFile(__dirname + "/html/admin.html"));
    server.get('/bread', (req, res) => res.sendFile(__dirname + "/html/bread.html"));
    server.get('/essay', (req, res) => res.sendFile(__dirname + "/html/essay.html"));
    server.get('/snake', (req, res) => res.sendFile(__dirname + "/html/snake.html"));
    server.get('/setScore', (req, res) => {
        request(`http://localhost:8000?${req.url.split("?")[1]}`, function(error, response, body) {
        });
    })
    server.get('/posts/:type', async (req, res, next) =>  {
        try {
            const { type } = req.params;
            var posts = await models.posts.findAll({where: { type: type }, order: [['createdAt', 'DESC']]});
            posts = posts.map(x => x.get({ plain: true }));            
            for (const post of posts) {
              const images = await models.pictures.findAll({ attributes: ["source"], where: { postId: post.id }}).map(x => x.source);
              post.images = images;
            }
            res.status(200).send({ success: true, data: posts });
            next();
        } catch (e) {
            res.status(400).send({ success: false, error: e.message });
        }
    })
    server.post('/posts', upload.array('images'), async (req, res, next) =>  {
        try {
            console.log(req.body);

            const type = req.body.type
            const newPost = await models.posts.create(req.body);
            req.files.forEach(async (file) => {
                await models.pictures.create({"source": "uploads/"+file.filename, "postId": newPost.id});
                console.log("uploaded ", file.path);
            })
            console.log(newPost);
            res.redirect(`/${type}`);
            next();
        } catch (e) {
            res.status(400).send({ success: false, error: e.message });
        }
    })


    server.get('/favicon.ico', (req, res) => res.sendFile(__dirname + "/icon/favicon.ico"))
    server.get('/css/:id', (req, res) => {
        res.sendFile(__dirname + "/css/"+req.params.id);
    });
    server.get('/photo/:id', (req, res) => { 
        // res.setHeater("Content-Type", "image")
        res.sendFile(__dirname + "/photo/"+req.params.id);
    });
    server.get('/uploads/:id', (req, res) => { 
        res.sendFile(__dirname + "/uploads/"+req.params.id);
    });
    server.get('/essay/:id', (req, res) => { 
        res.sendFile(__dirname + "/html/essay/"+req.params.id);
    });

}

module.exports = {
    listen,
    setUpRoutes
};

