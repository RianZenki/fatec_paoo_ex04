const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const livroRoutes = require('./rotas/livros')

mongoose.connect('mongodb+srv://fatec_ipi_20211_paoo_livros:eeQthw6FreZhOccb@cluster0.e7cie.mongodb.net/app-mean?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log("conexão OK"))
  .catch(() => console.log("conexão NOK"))

const app = express()
app.use(express.json())
app.use(cors())
app.use(livroRoutes)
app.use('/api/livros', livroRoutes)

module.exports = app
