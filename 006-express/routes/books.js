const express = require('express')
const router = express.Router()
const axios = require('axios').default
const store = require('../helpers/store')

const url_api_books = process.env.ORIGIN + ':' + process.env.PORT + process.env.API_BOOKS

router.get('/', async (req, res) => {
  const data = await store.get('books')
  res.render('books/index', {
    title: 'Список книг',
    books: data
  })
})

router.get('/:id', async (req, res) => {
  const book = await store.getById('books', req.params.id)
  if (!book) {
    res.status(404).redirect('/404')
  }
  res.render('books/view', {
    title: book.title,
    book
  })
})

router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return
    console.log(url_api_books + id)
    await axios.delete(url_api_books + id)
    res.redirect('/books')
  } catch (e) {
    res.redirect('/404')
  }
})

module.exports = router
