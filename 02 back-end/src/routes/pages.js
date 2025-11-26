const express = require('express')
const routerServer = express.Router()
const pagesController = require('../controllers/pagesController')

routerServer.get('/Home', pagesController.home)
routerServer.get('/Contact', pagesController.contact)
routerServer.get('/About', pagesController.about)
routerServer.get('/Portfolio', pagesController.portfolio)
routerServer.get('/Portfolio/Project-Website', pagesController.website)
routerServer.get('/Portfolio/Project-Marketing', pagesController.marketing)
routerServer.get('/Portfolio/Project-Branding', pagesController.branding)
routerServer.get('/Portfolio/Project-Photo-Edition', pagesController.photo_edition)


module.exports = routerServer