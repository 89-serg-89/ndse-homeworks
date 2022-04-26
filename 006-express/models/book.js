const uuid = require('uuid')

class Book {
  constructor (title, description, authors, favorite, fileCover, fileName) {
    this.id = uuid.v4()
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

module.exports = Book
