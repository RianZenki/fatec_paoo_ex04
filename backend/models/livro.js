const mongoose = require('mongoose')

//definindo o "schema"
const livroSchema = mongoose.Schema ({
  id: {type: String, required: true},
  titulo: {type: String, required: true},
  autor: {type: String, required: true},
  nroPaginas: {type: String, required: true}
})

module.exports = mongoose.model('Livro', livroSchema)
