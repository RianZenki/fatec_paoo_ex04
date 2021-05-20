const express = require('express')
const router = express.Router()
const Livro = require('../models/livro')

router.post('', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(livro => {
    if(livro){
      res.status(200).json(livro)
    }
    else {
      res.status(404).json({mensagem: "Livro não encontrado!"})
    }
  })
})

router.get('', (req, res, next) => {
  Livro.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents
    })
  })
})

router.delete('/:objectId', (req, res, next) => {
  Livro.deleteOne({_id: req.params.objectId}).then((resultado) => {
    res.status(200).json({mensagem: "Livro removido"})
  })
})


router.put('/:objectId', (req, res, next) => {
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

module.exports = router
