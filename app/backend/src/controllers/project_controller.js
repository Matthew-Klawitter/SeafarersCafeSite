/**
 * CRUD Projects
 */
 module.exports = function(app, db){
    app.post('/api/auth/projects/create', async (req, res) => {
        try {
            const projectExists = await db.findOne({where: {name: req.body.name}});

            if (projectExists != null && projectExists){
                // This project already exists. No need to insert another entry
                console.log('Unable to POST project: Project already exists');
                return;
            }

            // This project doesn't exist, we can safely create one
            await db.create(req.body);
            console.log('Successfully POST project: ' + req.body.name);
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/projects/all', async (req, res) => {
        try {
            let projects = await db.findAll();
            projects = projects.map(x => x.get({plain: true}));

            if (projects != null){
                res.send(projects);
                console.log('Sent GET all for projects');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for projects');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/projects/:id', async (req, res) => {
        try {
            let project = await db.findOne({where: {id: req.params.id}});
            project = project.get({plain: true});

            if (project != null){
                res.send(project);
                console.log('Sent GET for project: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for project: Project does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/api/auth/projects/update', async (req, res) => {
        try {
            let project = await db.findOne({where: {id: req.body.id}});

            if (project != null){
                project.update({
                    name: req.body.name
                });
                project.save();
                console.log('Successfully PUT project: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.post('/api/auth/projects/delete', async (req, res) => {
        try {
            let project = await db.findOne({where: {id: req.body.id}})

            if (project != null){
                await project.destroy();
                console.log('Successfully DELETE project: ' + req.body.id);
            }
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
}