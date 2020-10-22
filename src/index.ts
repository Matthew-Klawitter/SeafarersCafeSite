import {createConnection} from "typeorm";
import express, { Request, Response } from 'express'
import "reflect-metadata";
import { AboutController } from './controllers/AboutController';
import { AdminController } from './controllers/AdminController';
import { ArticleController } from './controllers/ArticleController';
import { IndexController } from './controllers/IndexController';
import { StudiosController } from "./controllers/StudiosController";


const router = express();

// Application port
const port = 3000;

// Setup Controllers
const aboutController = new AboutController();
const adminController = new AdminController();
const articleController = new ArticleController()
const indexController = new IndexController();
const studiosController = new StudiosController();

/* Establish routes and start server */
createConnection().then(async connection => {
    // AboutController
    router.get('/about', (req: Request, res: Response) => {
        aboutController.index(req, res);
    })

    // AdminController
    router.get('/admin/login', (req: Request, res: Response) => {
        indexController.index(req, res);
    });

    // ArticleController
    router.get('/articles', (req: Request, res: Response) => {
        indexController.index(req, res);
    });

    // IndexController Routes
    router.get('/', (req: Request, res: Response) => {
        indexController.index(req, res);
    });

    // StudiosController
    router.get('/studios', (req: Request, res: Response) => {
        studiosController.index(req, res);
    })


    router.listen(port, () => console.info(`Server is listening on port ${port}!`));
}).catch(error => console.log(error));
