const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Livro = require('./models/livro')

// const livros = [
//   {
//     id: '1',
//     titulo: 'aaaa',
//     autor: 'Pedro',
//     nroPaginas: '400'
//   },
//   {
//     id: '2',
//     titulo: 'bbb',
//     autor: 'João',
//     nroPaginas: '300'
//   }
// ]

mongoose.connect('mongodb+srv://fatec_ipi_20211_paoo_livros:fWUJqENV2g2MBY5a@cluster0.e7cie.mongodb.net/app-mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("conexão OK")
  }).catch(() => {
    console.log("conexão NOK")
  })
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

  next()
})

app.post('/api/livros', (req, res, next) => {
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    nroPaginas: req.body.nroPaginas
  })
  livro.save()
  console.log(livro)
  res.status(201).json({mensagem: 'Livro inserido'})
})

app.use('/api/livros', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
  })
})

app.get('/api/livros', (req, res, next) => {
  Livros.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents
    })
  })
})

module.exports = app
