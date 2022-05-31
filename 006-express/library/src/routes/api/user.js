const express = require('express')
const router = express.Router()
const userModel = require('../../models/user')
const { auth } = require('../../helpers/passport')
const getHash = require('../../helpers/crypto')

router.post('/login', auth, (req, res) => {
  try {
    res.status(201)
    res.header('Access-Control-Allow-Origin', '*')
    res.json('success')
  } catch (e) {
    console.log('Error:', e)
    res.status(404)
    res.end()
  }
})

router.post('/signup', async (req, res) => {
  try {
    const candidate = await userModel.find({ login: req.body.login })
    if (candidate.length) {
      res.status(200)
      return res.json({
        error: 'Логин занят'
      })
    }
    const user = new userModel({
      ...req.body,
      password: getHash(req.body.password)
    })
    await user.save()
    res.status(201)
    res.json(user)
  } catch (e) {
    console.log('Error:', e)
    res.status(404)
    res.end()
  }
})

module.exports = router
