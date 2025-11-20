const server = require('express')
const routerServer = express.router()
const pagesController = require('../controllers/pagesController')

routerServer.get('/', pagesController.home)
routerServer.get('/contact', pagesController.home)
routerServer.get('/portfolio', pagesController.home)

module.exports = routerServer