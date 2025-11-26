import {PrimaClient} from '@prisma/client'

const server = require('express')
const port = 3900
const prisma = new PrimaClient()
const path = require('path')
const routePages = require('./routes/pages')

// Configuration EJS
server.set('view engine', 'ejs')
server.set('view options', {delimiter: '?'})
server.set('views', path.join(__dirname, '../src/views'))



server.use(express.static('../../01 front-end/public'))


// Routes
server.use('/', routePages)

server.get('/', (req, res) => {
  res.render('Home')
})



server.use(express.json)


// Récupérer les oeuvres
/* server.get('/api/artworks', (req, res) => {
  const artworks = prisma.artworks.findMany()
  res.json(artworks)
}) */

// Ajouter une oeuvre
/* server.post('/api/artworks', (req, res) => {
  const {titre, annee, categorie, imageUrl} = req.body
  const newArtwork = prisma.artwork.create({
    data: {titre, annee, categorie, imageUrl},
  })
  res.json(newArtwork)
}) */


// Suprimer une oeuvre
/* server.delete('/api/artworks', (req, res) => {
  const {titre, annee, categorie, imageUrl} = req.body
  const deleteArtwork = prisma.artwork.delete({
    data: {titre, annee, categorie, imageUrl},
  })
  res.json(newArtwork)
}) */


server.listen(port, () => console.log(`Connectée au port: ${port}!`))
