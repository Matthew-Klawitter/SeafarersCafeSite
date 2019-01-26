const express = require('express');
const request = require('request');

const port = 80;

const server = express();

function listen(){
    server.listen(port, () => console.info(`Listening on port ${port}!`));
}

function setUpRoutes(){
    server.get('/', (req, res) => res.sendFile(__dirname + "/html/index.html"))
    server.get('/bread', (req, res) => res.sendFile(__dirname + "/html/bread.html"));
    server.get('/essay', (req, res) => res.sendFile(__dirname + "/html/essay.html"));
    server.get('/snake', (req, res) => res.sendFile(__dirname + "/html/snake.html"));
    server.get('/setScore', (req, res) => {
        request(`http://localhost:8000?${req.url.split("?")[1]}`, function(error, response, body) {
        });
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

