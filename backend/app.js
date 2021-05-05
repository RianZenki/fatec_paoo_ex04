const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Livro = require('./models/livro')

mongoose.connect('mongodb+srv://fatec_ipi_20211_paoo_livros:eeQthw6FreZhOccb@cluster0.e7cie.mongodb.net/app-mean?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log("conexão OK"))
  .catch(() => console.log("conexão NOK"))

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/livros', (req, res, next) => {
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    nroPaginas: req.body.nroPaginas
  })
  livro.save().
  then(livroInserido => {
    res.status(201).json({
      mensagem: 'Livro inserido',
      objectId: livroInserido._id
    })
  })
})


app.get('/api/livros', (req, res, next) => {
  Livro.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents
    })
  })
})

app.delete('/api/livros/:objectId', (req, res, next) => {
  Livro.deleteOne({_id: req.params.objectId}).then((resultado) => {
    res.status(200).json({mensagem: "Livro removido"})
  })
})

module.exports = app
