const express = require('express')
const router = express.Router()
const axios = require('axios').default
const store = require('../helpers/store')
const fileMiddleware = require('../middleware/file')

const url_api_books = process.env.ORIGIN + ':' + process.env.PORT + process.env.API_BOOKS

router.get('/create', (req, res) => {
  try {
    res.render('books/create', {
      title: 'Добавить книгу',
      route: 'create',
      book: {}
    })
  } catch (e) {
    console.log(e)
    res.status(404).redirect('/404')
  }
})

router.post(
  '/create',
  fileMiddleware.fields([
    {
      name: 'fileCover', maxCount: 1
    },
    {
      name: 'fileBook', maxCount: 1
    }
  ]),
  async (req, res) => {
    try {
      await axios.post(url_api_books, {
        fileCover: req?.files?.fileCover?.[0].filename,
        ...req.body
      })
      res.redirect('/books')
    } catch (e) {
      res.status(404).redirect('/404')
    }
  })

router.get('/edit/:id', async (req, res) => {
  try {
    const book = await store.getById('books', req.params.id)
    if (!book) res.status(404).redirect('/404')
    res.render('books/edit', {
      title: `Редактирование ${book.title}`,
      route: 'edit',
      book
    })
  } catch (e) {
    res.status(404).redirect('/404')
  }
})

router.post(
  '/edit/:id',
  fileMiddleware.fields([
    {
      name: 'fileCover', maxCount: 1
    },
    {
      name: 'fileBook', maxCount: 1
    }
  ]),
  async (req, res) => {
  try {
    const id = req.params.id
    if (!id) res.status(404).redirect('/404')
    await axios.put(url_api_books + id, {
      fileCover: req?.files?.fileCover?.[0].filename,
      ...req.body
    })
    res.redirect('/books')
  } catch (e) {
    res.status(404).redirect('/404')
  }
})

router.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) res.status(404).redirect('/404')
    await axios.delete(url_api_books + id)
    res.redirect('/books')
  } catch (e) {
    res.status(404).redirect('/404')
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await store.get('books')
    res.render('books/index', {
      title: 'Список книг',
      books: data
    })
  } catch (e) {
    res.redirect('/404')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await store.getById('books', req.params.id)
    if (!book) res.status(404).redirect('/404')
    res.render('books/view', {
      title: book.title,
      book
    })
  } catch (e) {
    res.redirect('/404')
  }
})

module.exports = router
