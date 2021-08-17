/**
 * CRUD Posts
 */
 module.exports = function(app, db){
    app.post('/db/posts/create', async (req, res) => {
        try {
            const postExists = await db.findOne({where: {name: req.body.name}});

            if (postExists != null && postExists){
                // This tag already exists. No need to insert another entry
                console.log('Unable to POST post: Post already exists');
                return;
            }

            // This tag doesn't exist, we can safely create one
            await db.create(req.body);
            console.log('Successfully POST post: ' + req.body.name);
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/db/posts/all', async (req, res) => {
        try {
            let posts = await db.findAll();
            posts = posts.map(x => x.get({plain: true}));

            if (posts != null){
                res.send(posts);
                console.log('Sent GET all for posts');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for posts');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/db/posts/:id', async (req, res) => {
        try {
            let post = await db.findOne({where: {id: req.params.id}});
            post = post.get({plain: true});

            if (post != null){
                res.send(post);
                console.log('Sent GET for post: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for post: Post does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/db/posts/update', async (req, res) => {
        try {
            let post = await db.findOne({where: {id: req.body.id}});

            if (post != null){
                post.update({
                    name: req.body.name
                });
                post.save();
                console.log('Successfully PUT post: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/db/posts/delete', async (req, res) => {
        try {
            let post = await db.findOne({where: {id: req.body.id}})

            if (post != null){
                await post.destroy();
                console.log('Successfully DELETE post: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
}