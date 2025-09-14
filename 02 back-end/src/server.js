import express from 'express'
import {PrimaClient} from '@prisma/client'


const server = express()
const port = 3900
const prisma = new PrimaClient()

server.use(express.json)


// Récupérer les oeuvres
server.get('/api/artworks', (req, res) => {
  const artworks = prisma.artworks.findMany()
  res.json(artworks)
})

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
