import path from 'path';
import { Request, Response } from 'express';

export class ArticleController{
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/studios/articles.html'));
    }

    /*
    TODO:
    View a single article
    */
    public view(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/studios/articles.html'));
    }

    /*
    TODO:
    Require admin cookie
    Create a new article and write it to the database
    Send a notification that the article has been completed or redirect
    */
    public create(req: Request, res: Response){
        
    }

    /*
    TODO:
    Require admin cookie
    Show a database view of all articles
    */
    public read(req: Request, res: Response){
        
    }

    /*
    TODO:
    Require admin cookie
    Update the data within an existing article
    Send a notification that the article update is complete
    */
    public update(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/articles/studios.html'));
    }

    /*
    TODO:
    Require admin cookie
    Delete a created article
    Redirect the user to a view with all articles
    */
    public delete(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/articles/studios.html'));
    }
}


// TODO: Implement this into the above class
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

const upload = multer({ storage: storage })