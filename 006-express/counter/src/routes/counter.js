const express = require('express')
const router = express.Router()
const redis = require('redis')

router.get('/:bookId', (req, res) => {
  console.log(redis)
  // console.log(req.params.bookId)
  res.json({test: 'test'})
})

module.exports = router
