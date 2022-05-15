const express = require('express')
const router = express.Router()

router.get('/404', (req, res) => {
  res.render('error/404', {
    title: '404 | Нет такой страницы'
  })
})

module.exports = router
