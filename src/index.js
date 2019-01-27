const server = require('./server');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const dbCreds = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'))).database;

const database = new Sequelize(dbCreds.database, dbCreds.user, dbCreds.password, {
  logging(str) {
    console.debug(`DB:${str}`);
  },
  dialectOptions: {
    charset: 'utf8mb4',
    multipleStatements: true,
  },
//   host: dbCreds.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

database.authenticate().then(() => {
  console.debug(`database connection successful: ${dbCreds.database}`);
}, (e) => console.log(e));

async function sync(alter, force, callback) {
  await database.sync({ alter, force, logging: console.log });
}

function setUpModels(){
    const models = {
        "posts": database.define('posts', {
            description: {
            type: Sequelize.STRING,
            allowNull: false,
            },
            }),
        "pictures": database.define('pictures', {
            source: { type: Sequelize.TEXT, allowNull: false},
          })
    }
    models.pictures.belongsTo(models.posts);
    return models;
}

const models = setUpModels();
sync();

server.setUpRoutes(models);
server.listen();

