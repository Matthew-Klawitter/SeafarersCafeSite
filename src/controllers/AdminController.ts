import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import path from 'path';
import { Request, Response } from 'express';
import {User} from "../entity/accounts/Users";
import { getRepository } from 'typeorm';
import { nextTick } from 'process';

export class AdminController{
    /**
     * Only route to admin if the client has an authenticated cookie
     * @param req 
     * @param res 
     */
    public index(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/admin/admin.html'));
    }

    /**
     * Route to the admin's login form
     * @param req 
     * @param res 
     */
    public login(req: Request, res: Response){
        res.sendFile(path.join(__dirname, '../views/admin/login.html'));
    }

    /**
     * Attempt to authenticate this session based on a posted response from a login form
     * On success send the browser a signed cookie and redirect to admin index
     * On fail redirect to login with an error, track number of failed attempts
     * @param req 
     * @param res 
     */
    public async authenticate(req: Request, res: Response){
        var user: User = await getRepository(User).findOne({userName: req.body.username});
        var hash: String = this.hashWithSalt(req.body.password, user.salt);

        if (user.password == hash) {
            const token = this.signToken(user.userName, "TODO: Some secret here");
            res.cookie('authorization', token, { expires: new Date(Date.now() + (1000 * 60 * 60)) });
            console.debug("Redirecting to admin - logged in");
            res.redirect('/admin/index');
        } else {
            console.debug("Redirecting to login - invalid login");
            res.redirect('/admin/login');
        }
    }

    /**
     * Attempt to verify the validity of this session
     * @param req 
     * @param res 
     */
    public async checkAuthorization(req: Request, res: Response){
        let cookie = req.cookies.authorization

        if (!cookie) {
            // There is no valid user or cookie. Redirecting to login.
            console.debug("Redirecting to login - invalid cookie")
            res.redirect('/admin/login');
            return;
        }
        try {
            var decryptedUserId = this.verifyToken(cookie, "TODO: Some secret here");
            await getRepository(User).findOne({userName: decryptedUserId}).then((user : User) => {
                if (user) {
                    // Stores the user's userName in a temporary local var user during the requests lifetime
                    res.locals.user = user.userName;
                } else {
                    // There is no valid user or cookie. Redirecting to login.
                    console.debug("Redirecting to login - invalid cookie")
                    res.redirect('/admin/login');
                    return;
                }
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }

    // TODO: Refactor - The following three methods are better suited in their own helper class

    /**
     * Signs a token containing specified data based on a given secret encryption key
     * @param data
     * @param secret 
     */
    public signToken(data, secret){
        return jwt.sign({value: data}, secret);
    }

    /**
     * Attempts to verify a token containing specified data based on a given secret encryption key
     * @param token 
     * @param secret 
     */
    public verifyToken(token, secret){
        return jwt.verify(token, secret).value;
    }

    /**
     * Hashes and salts a provided password
     * @param password 
     * @param salt 
     */
    public hashWithSalt(password, salt){
        var hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest("base64");
    }
}