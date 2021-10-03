/**
 * CRUD Tags
 */
 module.exports = function(app, db){
    app.post('/api/auth/tags/create', async (req, res) => {
        try {
            const tagExists = await db.findOne({where: {name: req.body.name}});

            if (tagExists != null && tagExists){
                // This tag already exists. No need to insert another entry
                console.log('Unable to POST tag: Tag already exists');
                return;
            }

            // This tag doesn't exist, we can safely create one
            await db.create(req.body);
            console.log('Successfully POST tag: ' + req.body.name);
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/tags/all', async (req, res) => {
        try {
            let tags = await db.findAll();
            tags = tags.map(x => x.get({plain: true}));

            if (tags != null){
                res.send(tags);
                console.log('Sent GET all for tags');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for tags');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/tags/:id', async (req, res) => {
        try {
            let tag = await db.findOne({where: {id: req.params.id}});
            tag = tag.get({plain: true});

            if (tag != null){
                res.send(tag);
                console.log('Sent GET for tag: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for tag: Tag does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/api/auth/tags/update', async (req, res) => {
        try {
            let tag = await db.findOne({where: {id: req.body.id}});

            if (tag != null){
                tag.update({
                    name: req.body.name
                });
                tag.save();
                console.log('Successfully PUT tag: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/api/auth/tags/delete', async (req, res) => {
        try {
            let tag = await db.findOne({where: {id: req.body.id}})

            if (tag != null){
                await tag.destroy();
                console.log('Successfully DELETE tag: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
}