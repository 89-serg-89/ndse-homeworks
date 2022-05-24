const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  authors: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  fileCover: {
    type: String
  },
  fileName: {
    type: String
  },
  fileBook: {
    type: String
  }
})

module.exports = model('Books', bookSchema)
