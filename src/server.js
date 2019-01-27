const express = require('express');
const request = require('request');

const port = 80;

const server = express();

function listen(){
    server.listen(port, () => console.info(`Listening on port ${port}!`));
}

function setUpRoutes(models){
    server.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/bread', (req, res) => res.sendFile(__dirname + "/html/bread.html"));
    server.get('/essay', (req, res) => res.sendFile(__dirname + "/html/essay.html"));
    server.get('/snake', (req, res) => res.sendFile(__dirname + "/html/snake.html"));
    server.get('/setScore', (req, res) => {
        request(`http://localhost:8000?${req.url.split("?")[1]}`, function(error, response, body) {
        });
    })
    server.get('/posts.json', async (req, res, next) =>  {
        try {
            var posts = await models.posts.findAll();
            posts = posts.map(x => x.get({ plain: true }));            
            for (const post of posts) {
              const images = await models.pictures.findAll({ attributes: ["source"], where: { postId: post.id } }).map(x => x.source);
              post.images = images;
            }
            res.status(200).send({ success: true, data: posts });
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
        res.sendFile(__dirname + "/photo/"+req.params.id);
    });
    server.get('/essay/:id', (req, res) => { 
        res.sendFile(__dirname + "/html/essay/"+req.params.id);
    });

}

module.exports = {
    listen,
    setUpRoutes
};

