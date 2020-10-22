import {createConnection} from "typeorm";
import express, { Request, Response } from 'express'
import "reflect-metadata";
import { IndexController } from './controllers/IndexController';


const multer = require('multer');
const router = express();

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

const upload = multer({ storage: storage })


/* Establish routes and start server */
createConnection().then(async connection => {
    var port = 3000;

    // Setup Controllers
    const indexController = new IndexController();

    // Establish routes
    router.get('/', (req: Request, res: Response) => {
        indexController.read(req, res);
    });


    router.listen(port, () => console.info(`Server is listening on port ${port}!`));
}).catch(error => console.log(error));
