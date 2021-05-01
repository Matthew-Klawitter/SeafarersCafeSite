const multer = require('multer')

// Multer configuration for uploaded images
const sourcePath = '/uploads/images'

const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true)
    }
    else {
        cb('Please only upload images.', false)
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, sourcePath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage, fileFilter: filter})

/**
 * CRUD Photos
 * TODO: reformat this to support current REST implementation
 */
 module.exports = function(server, db){
    app.post('/photos', upload.single('file'), async (req, res) => {
        try {
            const file = req.file;

            if (!file || !file.mimetype.startsWith('image')) {
                // A file was not uploaded or is not an image
                console.log('Unable to POST background: No file uploaded.');
                res.status(400).send('Please upload an image file.')
                return;
            }

            const backgroundExists = await db.Background.findOne({where: {filename: file.originalname}});

            if (backgroundExists != null && backgroundExists){
                // This background has already been uploaded. No need to insert another entry
                console.log('Unable to POST background: Background already exists.');
                res.redirect('/admin/backgrounds?msg=Background already exists.')
                return;
            }

            // This background doesn't yet exist, we can safely create one
            let background = {
                filename: file.originalname,
                path: relativePath + file.originalname,
                author: req.body.author,
                source: req.body.source,
                moodId: req.body.mood
            };

            await db.Background.create(background);
            console.log('Successfully POST background: ' + file.originalname);
            res.redirect('/admin/backgrounds');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/photos', async (req, res) => {
        try {
            let backgrounds = await db.Background.findAll();
            backgrounds = backgrounds.map(x => x.get({plain: true}));

            if (backgrounds != null){
                res.send(backgrounds);
                console.log('Sent GET all for backgrounds');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for backgrounds');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/photos/:id', async (req, res) => {
        try {
            let background = await db.Background.findOne({where: {id: req.params.id}});
            background = background.get({plain: true});

            if (background != null){
                res.send(background);
                console.log('Sent GET for background: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for background: Background does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.get('/photos/img/:id', async (req, res) => {
        try {
            let background = await db.Background.findOne({where: {id: req.params.id}});
            background = background.get({plain: true});

            if (background != null){
                let img = path.join(__dirname, '..', '..', background.path);
                res.sendFile(img);
                console.log('Sent background image: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for background: Background does not exist.');
                return;
            }
        } catch (e){
            console.log(e);
            res.status(400).send(e.message);
        }
    });

    app.put('/db/backgrounds/update', async (req, res) => {
        try {
            let background = await db.Background.findOne({where: {id: req.body.id}});

            if (background != null){
                // TODO: For baseline release, we're not going to worry about the ability
                // to change filename and source. We'll need to work heavily with the multer
                // for support. Current workaround is deleting a background and reuploading it.
                background.update({
                    author: req.body.author,
                    source: req.body.source,
                    moodId: req.body.mood
                });
                background.save();
                console.log('Successfully PUT background: ' + req.body.id);
            }

            res.redirect('/admin/backgrounds');
        } catch (e){
            res.status(400).send(e.message);
        }
    });

    app.delete('/db/backgrounds/delete', async (req, res) => {
        try {
            let background = await db.Background.findOne({where: {id: req.body.id}})

            if (background != null){
                await background.destroy();
                fs.unlink(sourcePath + background.get({plain: true}).filename, (err) =>{
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                console.log('successfully DELETE background: ' + req.body.id);
            }

            res.redirect('/admin/backgrounds');
        } catch (e){
            res.status(400).send(e.message);
        }
    });
}

