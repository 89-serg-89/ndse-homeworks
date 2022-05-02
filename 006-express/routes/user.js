const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  try {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
  } catch (e) {
    res.status(404)
    res.end()
  }
})

module.exports = router
