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
 module.exports = function(app, db, express){
    app.post('/api/auth/photos/upload', upload.single('file'), async (req, res) => {
        try {
            const file = req.file;

            if (!file || !file.mimetype.startsWith('image')) {
                // A file was not uploaded or is not an image
                console.log('Unable to POST photo: No file uploaded.');
                res.status(400).send('Please upload an image file.')
                return;
            }

            const photoExists = await db.findOne({where: {filename: file.originalname}});

            if (photoExists != null && photoExists){
                // This photo has already been uploaded. No need to insert another entry
                console.log('Unable to POST photo: Photo already exists.');
                return;
            }

            // This photo doesn't yet exist, we can safely create one
            let photo = {
                name: file.originalname,
                path: relativePath + file.originalname
            };

            await db.create(photo);
            console.log('Successfully POST photo: ' + file.originalname);
            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/photos/all', async (req, res) => {
        try {
            let photos = await db.findAll();
            photos = photos.map(x => x.get({plain: true}));

            if (photos != null){
                res.send(photos);
                console.log('Sent GET all for photos');
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET all for photos');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.get('/api/pub/photos/:id', async (req, res) => {
        try {
            let photo = await db.findOne({where: {id: req.params.id}});
            photo = photo.get({plain: true});

            if (photo != null){
                res.send(photo);
                console.log('Sent GET for photos: ' + req.params.id);
                return;
            }
            else {
                res.sendStatus(404);
                console.log('Unable to send GET for photos: Photo does not exist.');
                return;
            }
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });

    app.delete('/api/auth/photos/delete', async (req, res) => {
        try {
            let photo = await db.findOne({where: {id: req.body.id}})

            if (photo != null){
                await photo.destroy();
                fs.unlink(sourcePath + photo.get({plain: true}).filename, (err) =>{
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                console.log('successfully DELETE photo: ' + req.body.id);
            }

            return;
        } catch (e){
            res.status(400).send(e.message);
            return;
        }
    });
}

