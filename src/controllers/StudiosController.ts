import path from 'path';
import { Request, Response } from 'express';

export class StudiosController{
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/studios/studios.html'));
    }
}