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

app.get('/api/livros/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(livro => {
    if(livro){
      res.status(200).json(livro)
    }
    else {
      res.status(404).json({mensagem: "Livro não encontrado!"})
    }
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


app.put('/api/livros/:objectId', (req, res, next) => {
  const livro = new Livro({
    _id: req.params.objectId,
    id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    nroPaginas: req.body.nroPaginas
  })
  Livro.updateOne({_id: req.params.objectId}, livro)
  .then((resultado) => {
    console.log(resultado)
    res.status(200).json({mensagem: "Atualização realizada com sucesso"})
  })
})

module.exports = app
