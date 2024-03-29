# SeafarersCafeSite
The SeafarersCafeSite project aims to create a themed content-creator styled SPA web app that advertises the content of the Seafarers' Cafe group.

[Image of current styling](https://raw.githubusercontent.com/Matthew-Klawitter/SeafarersCafeSite/master/app/examples/Example.PNG "Style example")

Current features:
1. Frontend SPA powered by Vue.js through Vue CLI and Bootstrap SASS
2. Express REST API server that handles requests to a MySQL database
3. A fully configured dev environment and production deployment through docker and docker-compose imaging
4. An advertised podcast - leads to a separate templated podcast website

Upcoming features:
1. Fully integrated blog powered with markdown
2. Dynamic markdown article editor
3. Project page detailing the many projects worked on and contributed by the group
4. Tag system for searching and viewing related articles
5. RSS export
6. Ability to download blogposts to converted formats such as epub

## Project setup
Prerequisites:
1. Nodejs
2. Docker
3. Docker-Compose (recommended for ease and consistent dev builds)

Note: Technically the following steps should be optional. However, following them should greatly increase docker and docker-compose build times as well as ensuring hotreload is stable for the frontend service.

Install node modules for the frontend and backend services
1. Enter the "/app/frontend" directory
2. Run: npm install
3. Enter the "/app/backend" directory
4. Run: npm install

The development version of the project can then easily be run by calling the following command in the root directory: docker-compose up -d

The project can then be shutdown by calling the following command in the root directory: docker-compose down

### Autogenerated launch options for builds without docker
Note that there may be some parameter inconsistencies if you don't build with docker-compose as the dev environment is currently dependent on the values within the .env file.

Frontend scripts (run within the context of '/app/frontend'):
1. Compiles and hot-reloads for development
```
npm run serve
```
2. Compiles and minifies for production
```
npm run build
```
3. Lints and fixes files
```
npm run lint
```
4. Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Backend scripts (run within the context of '/app/backend'):
1. Start the backend REST server
```
npm start
```
