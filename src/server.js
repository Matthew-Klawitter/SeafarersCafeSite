const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const finale = require('finale-rest')

let api = express()
api.use(cors())
api.use(express.json())

// api.use((req, res, next) => {
//     //check auth here, if authorized, then move on to the next route
// })

api.get('/api', function(req, res) {
    console.log(req)
    res.send("Hello")
})

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
})

// Sequelize models
const Admins = require('./api/models/admins.js')
Admins(database, Sequelize.DataTypes)
const Photos = require('./api/models/photos.js')
Photos(database, Sequelize.DataTypes)
const Posts = require('./api/models/posts.js')
Posts(database, Sequelize.DataTypes)
const Projects = require('./api/models/projects.js')
Projects(database, Sequelize.DataTypes)
const Tags = require('./api/models/tags.js')
Tags(database, Sequelize.DataTypes)

finale.initialize({
    app: api,
    sequelize: database
})

// let adminResource = finale.resource({
//     model: Admins,
//     endpoints: ['/admins', '/admins/:id']
// })

// let photoResource = finale.resource({
//     model: Photos,
//     endpoints: ['/photos', '/photos/:id']
// })

// let postResource = finale.resource({
//     model: Posts,
//     endpoints: ['/posts', '/posts/:id']
// })

// let projectResource = finale.resource({
//     model: Projects,
//     endpoints: ['/projects', '/projects/:id']
// })

// let tagResource = finale.resource({
//     model: Tags,
//     endpoints: ['/tags', '/tags/:id']
// })

database.sync().then(() => {
    api.listen(process.env.API_PORT, () => {
        console.log(`API listening to port ${process.env.DB_HOST}:${process.env.DB_PORT}`)
    })
})
