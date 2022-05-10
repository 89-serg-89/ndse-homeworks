const path = require('path')
const express = require('express')
const router = express.Router()
let booksStore = require('../../store/books')
const BookModel = require('../../models/book')
const fileMiddleware = require('../../middleware/file')

router.get('/', (req, res) => {
  try {
    res.json(booksStore)
  } catch (e) {
    throw new Error(e)
  }
})

router.get('/:id', (req, res) => {
  try {
    const elem = booksStore.find(item => item.id === req.params.id)
    if (!elem) {
      res.status(404)
      res.json('book not found')
      return
    }
    res.json(elem)
  } catch (e) {
    throw new Error(e)
  }
})

router.post('/', fileMiddleware.single('cover'), (req, res) => {
  try {
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    if (title && description) {
      const filenameBook = req?.file.filename || ''
      booksStore.push(new BookModel(title, description, authors, favorite, fileCover, fileName, filenameBook))
      res.json('success')
      return
    }
    res.status(404).json('title && description required')
  } catch (e) {
    throw new Error(e)
  }
})

router.put('/:id', (req, res) => {
  try {
    let elemIdx = booksStore.findIndex(item => item.id === req.params.id)
    if (elemIdx === -1) {
      res.status(404)
      res.json('book not found')
      return
    }
    booksStore[elemIdx] = {...booksStore[elemIdx], ...req.body}
    res.json('success')
  } catch (e) {
    throw new Error(e)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const elem = booksStore.some(item => item.id === req.params.id)
    if (!elem) {
      res.status(404)
      res.json('book not found')
      return
    }
    booksStore = booksStore.filter(item => item.id !== req.params.id)
    res.json('true')
  } catch (e) {
    throw new Error(e)
  }
})

router.get('/:id/download', (req, res) => {
  try {
    const elem = booksStore.find(item => item.id === req.params.id)
    if (!elem) res.status(404).json('Book not found')
    const pathDir = path.join(__dirname, '..', 'public', 'books', 'files', elem.fileBook)
    res.download(pathDir, elem.fileBook, err => {
      res.status(404).end()
    })
  } catch (e) {
    throw new Error(e)
  }
})

module.exports = router
