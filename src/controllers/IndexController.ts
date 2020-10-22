import path from 'path';
import { Request, Response } from 'express';

export class IndexController{
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/index/index.html'));
    }
}