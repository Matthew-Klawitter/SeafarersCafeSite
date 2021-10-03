// loads environment variables from .env in the root directory
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const Sequelize = require('sequelize')

// Sequelize database
const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_IMAGE_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
})

const Admins = require('./models/admins.js')
admins = Admins(database, Sequelize.DataTypes)
const Photos = require('./models/photos.js')
photos = Photos(database, Sequelize.DataTypes)
const Posts = require('./models/posts.js')
posts = Posts(database, Sequelize.DataTypes)
const Projects = require('./models/projects.js')
projects = Projects(database, Sequelize.DataTypes)
const Tags = require('./models/tags.js')
tags = Tags(database, Sequelize.DataTypes)

// Express REST server
let server = express()
server.use(cors())
server.use(express.json())

// Authorization
// TODO: Go into each controller, and add specified routing for public api routes ('/api/public/') and private ('/api/private')
// Example below
// public route
// app.get('/api/publicInfo', (req, res) => {
//     res.status(200).send('You are viewing public info');
//   });
  
//   // protected route
//   app.get('/api/profile', verifyToken, (req, res) => {
//     oktaJwtVerifier.verifyAccessToken(req.token, 'api://default')
//       .then(jwt => {
//         res.send('You are viewing private profile info');
//       })
//       .catch(err => {
//         res.sendStatus(403);
//       });
//   });


server.use((req, res, next) => {
    // require every request to have an authorization header
    if (!req.headers.authorization) {
        return next(new Error('Authorization header is required'))
    }

})

// REST Endpoints
// Admin
var adminResource = require('./controllers/admin_controller.js')
adminResource(server, admins)

// Photos
var photoResource = require('./controllers/photo_controller.js')
photoResource(server, photos, express)

// Posts
var postResource = require('./controllers/post_controller.js')
postResource(server, posts)

// Projects
var projectResource = require('./controllers/project_controller.js')
projectResource(server, projects)

// Tags
var tagResource = require('./controllers/tag_controller.js')
tagResource(server, tags)

// Static route for public files (such as photos)
server.use(express.static(path.join(__dirname, 'public')))

// Start backend service
database.sync().then(() => {
    server.listen(process.env.API_PORT, () => {
        console.log(`Server listening to port localhost:${process.env.API_PORT}`)
    })
})