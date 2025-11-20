const server = require('express')
const routerServer = express.router()
const pagesController = require('../controllers/pagesController')

routerServer.get('/Home', pagesController.home)
routerServer.get('/Contact', pagesController.home)
routerServer.get('/Portfolio', pagesController.home)

module.exports = routerServer