const crypto = require('crypto');

function hashWithSalt(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest("base64");
};

/**
 * CRUD Account
 */
module.exports = function(app, db){
    // Only public route for registering new accounts
    app.post('/db/admins/create', async (req, res) => {
        try {
            if (isAuthorized != null && isAuthorized){
                const accountExists = await db.findOne({where: {username: req.body.username}});

                if (accountExists != null && accountExists){
                    // account with this username already exists so we cannot make a new one.
                    console.log('Unable to create account: username already in use.');
                    return;
                }

                // if we pass the prior constraints then we're all set to make a new account
                let salt = crypto.randomBytes(32).toString("Base64");
                const hash = hashWithSalt(req.body.password, salt);

                let user = {
                    username: req.body.username,
                    password: hash,
                    salt: salt,
                    email: req.body.email
                };

                await db.create(user);
                console.log('Successfully created account: ' + user.username);
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/db/admins/all', async (req, res) => {
        try {
            let accounts = await db.findAll();
            accounts = accounts.map(x => x.get({plain: true}));

            if (accounts != null){
                let dataAccount = [];

                for (i = 0; i < accounts.length; i++){
                    dataAccount.push({
                        id: accounts[i].id,
                        username: accounts[i].username
                    });
                }

                res.send(dataAccount);
                console.log('Sent GET all for accounts');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for accounts');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/db/admins/:id', async (req, res) => {
        try {
            let account = await db.findOne({where: {id: req.params.id}})
            account = account.get({plain: true});

            if (account != null){
                // We must only send selective info on accounts
                let details = {
                    id: account.id,
                    username: account.username
                }
                res.send(details);
                console.log('Sent GET for account: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to GET account: User does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.post('/db/admins/update', async (req, res) => {
        // TODO: Ability to update all account info not implemented on release. Will need methodology to update/change passwords
        try {
            let account = await db.findOne({where: {id: req.body.id}})
            let dataAccount = account.get({plain: true});

            // let salt = crypto.randomBytes(32).toString("Base64");
            // const hash = hashWithSalt(req.body.password, salt);

            if (account != null){
                account.update({
                    username: req.body.username
                });
                account.save();
            }
            
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
     
    app.post('/db/admins/delete', async (req, res) => {
        try {
            let account = await db.findOne({where: {id: req.body.id}});
            let dataAccount = account.get({plain: true});
            
            if (account != null){
                await account.destroy();
                console.log('Successfully DELETE account: ' + dataAccount.username);
                return;
            }

            console.log('Unable to DELETE account: User does not exist.');
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
}