const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const livros = [
  {
    id: '1',
    titulo: 'aaaa',
    autor: 'Pedro',
    nroPaginas: '400'
  },
  {
    id: '2',
    titulo: 'bbb',
    autor: 'João',
    nroPaginas: '300'
  }
]

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

  next()
})

app.post('/api/livros', (req, res, next) => {
  const livros = req.body
  console.log(livros)
  res.status(201).json({mensagem: 'Livro inserido'})
})

app.use('/api/livros', (req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: livros
  })
})

module.exports = app
