import {createConnection} from "typeorm";
import express, { Request, Response } from 'express'
import "reflect-metadata";
import { AboutController } from './controllers/AboutController';
import { AdminController } from './controllers/AdminController';
import { ArticleController } from './controllers/ArticleController';
import { IndexController } from './controllers/IndexController';
import { StudiosController } from "./controllers/StudiosController";


// Application server and port
const router = express();
const port = 3000;

// Setup Controllers
const aboutController = new AboutController();
const adminController = new AdminController();
const articleController = new ArticleController()
const indexController = new IndexController();
const studiosController = new StudiosController();

/* Attempt DB connection, establish routes, and start server */
createConnection().then(async connection => {
    // AboutController
    router.get('/about', (req: Request, res: Response) => {
        aboutController.index(req, res);
    })

    // AdminController
    router.get('/admin', (req: Request, res: Response) => {
        // check for authorized cookie before directing to /admin/index
        adminController.checkAuthorization(req, res);
        adminController.index(req, res);
    });
    router.get('/admin/login', (req: Request, res: Response) => {
        adminController.login(req, res);
    });
    router.post('/admin/auth', (req: Request, res: Response) => {
        adminController.authenticate(req, res);
    });

    // ArticleController
    router.get('/articles', (req: Request, res: Response) => {
        articleController.index(req, res);
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
