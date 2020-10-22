import path from 'path';
import { Request, Response } from 'express';

export class AdminController{
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/admin/studios.html'));
    }

    /*
    TODO:
    Prompt for input on a username and password
    On success send the browser a signed cookie and redirect to admin index
    On fail redirect to login with an error, track number of failed attempts
    */
    public login(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/admin/login.html'));
    }
}