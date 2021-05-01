// loads environment variables from .env in the root directory
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const Sequelize = require('sequelize')
const finale = require('finale-rest')

// Express REST server
let server = express()
server.use(cors())
server.use(express.json())

// Verify 
server.use((req, res, next) => {
    // require every request to have an authorization header
    if (!req.headers.authorization) {
        return next(new Error('Authorization header is required'))
    }

    let parts = req.headers.authorization.trim().split(' ')
    let accessToken = parts.pop()

    // write custom verification methodology here
    // on success go to next()
    // on fail, catch(next)
})

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_IMAGE_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
})

// Sequelize models
const Admins = require('./models/admins.js')
Admins(database, Sequelize.DataTypes)
const Photos = require('./models/photos.js')
Photos(database, Sequelize.DataTypes)
const Posts = require('./models/posts.js')
Posts(database, Sequelize.DataTypes)
const Projects = require('./models/projects.js')
Projects(database, Sequelize.DataTypes)
const Tags = require('./models/tags.js')
Tags(database, Sequelize.DataTypes)

finale.initialize({
    app: server,
    sequelize: database
})

// Created dynamic REST endpoints for supported models
let adminResource = finale.resource({
    model: Admins,
    endpoints: ['/admins', '/admins/:id']
})

let postResource = finale.resource({
    model: Posts,
    endpoints: ['/posts', '/posts/:id']
})

let projectResource = finale.resource({
    model: Projects,
    endpoints: ['/projects', '/projects/:id']
})

let tagResource = finale.resource({
    model: Tags,
    endpoints: ['/tags', '/tags/:id']
})

// Configure Photos REST endpoints manually for multer support
var photosResource = require('./controllers/photo_controller.js')
photosResource(server, database)

database.sync().then(() => {
    server.listen(process.env.API_PORT, () => {
        console.log(`Server listening to port localhost:${process.env.API_PORT}`)
    })
})