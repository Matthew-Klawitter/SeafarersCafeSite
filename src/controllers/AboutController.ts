import path from 'path';
import { Request, Response } from 'express';

export class AboutController{
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/about/aboutus.html'));
    }
}