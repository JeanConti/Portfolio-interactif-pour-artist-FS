const { PrismaClient } = require('@prisma/client')
const express = require('express')
const path = require('path')
const routePages = require('./routes/pages')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const port = 3900
const prisma = new PrismaClient()
const { body } = require('express-validator')



// Sécurité
server.use(helmet())
// Prend en charge les requêtes multi-origines sécurisées et les transferts de données entre des navigateurs et des serveurs web
server.use(cors({
  origin: port,
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Évite les attaques XSS et SQL injection
server.post('contact',
  body('email').isEmail().normalizeEmail(),
  body('message').trim().escape(),
  body('name').trim().escape(),
  (req, res) => {
    const {email, message, name} = req.body
    const newMessage = prisma.message.create({
      data: {email, message, name},
    })
    res.json(newMessage)
  }
)


// Sécuriser la BD
await prisma.user.findUnique({
  where: { email: email },
})

// Configuration EJS
server.set('view engine', 'ejs')
server.set('view options', {delimiter: '$'}) // Delimitador global
server.set('views', path.join(__dirname, '../src/views'))


server.use(express.static(path.join(__dirname, '../../01 front-end')))


// Routes
server.use('/', routePages)

// Middleware
server.use(express.json())


// Récupérer les oeuvres
/* server.get('/api/artworks', (req, res) => {
  const artworks = prisma.artworks.findMany()
  res.json(artworks)
}) */

// Ajouter une oeuvre
server.post('/api/artworks', (req, res) => {
  const {titre, annee, categorie, imageUrl} = req.body
  const newArtwork = prisma.artwork.create({
    data: {titre, annee, categorie, imageUrl},
  })
  res.json(newArtwork)
})


// Suprimer une oeuvre
server.delete('/api/artworks', (req, res) => {
  const {titre, annee, categorie, imageUrl} = req.body
  const deleteArtwork = prisma.artwork.delete({
    data: {titre, annee, categorie, imageUrl},
  })
  res.json(newArtwork)
})


server.listen(port, () => console.log(`Connectée au port: ${port}!`))
