const express = require('express')
const router = express.Router()
const redisClient = require('../helpers/redis')

router.get('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params
    const count = await redisClient.get(bookId)
    res.json({ count })
  } catch (e) {
    console.log(e)
    res.status(500).json({ err: `Error: ${ e }` })
  }
})

router.post('/:bookId/incr', async (req, res) => {
  try {
    const { bookId } = req.params
    const count = await redisClient.incr(bookId)
    res.json({ count })
  } catch (e) {
    console.log(e)
    res.status(500).json({ err: `Error: ${ e }` })
  }
})

module.exports = router
