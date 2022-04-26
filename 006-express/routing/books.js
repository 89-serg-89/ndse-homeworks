const express = require('express')
const router = express.Router()
let booksStore = require('../store/books')
const BookModel = require('../models/book')

router.get('/', (req, res) => {
  try {
    res.json(booksStore)
  } catch (e) {
    res.status(404)
    res.end()
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
    res.status(404)
    res.end()
  }
})

router.post('/', (req, res) => {
  try {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    if (title && description) {
      booksStore.push(new BookModel(title, description, authors, favorite, fileCover, fileName))
    }
    res.json('success')
  } catch (e) {
    res.status(404)
    res.end()
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
    res.status(404)
    res.end()
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
    res.status(404)
    res.end()
  }
})

module.exports = router
