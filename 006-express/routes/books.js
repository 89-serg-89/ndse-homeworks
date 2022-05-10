const express = require('express')
const router = express.Router()
const booksStore = require('../store/books')

router.get('/', (req, res) => {
  res.render('books/index', {
    title: 'Список книг',
    books: booksStore
  })
})

module.exports = router
