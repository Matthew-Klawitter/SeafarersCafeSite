const express = require('express');

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

