const axios = require('axios').default
const express = require('express')
const router = express.Router()
const { isAuthenticated, auth } = require('../helpers/passport')

const url_api_user = process.env.ORIGIN && process.env.PORT
  ? process.env.ORIGIN + ':' + process.env.PORT + '/api/user'
  : 'http://localhost:3000/api/user'

router.get('/login', (req, res) => {
  try {
    res.render('users/login', {
      title: 'Вход',
      error: req.query?.error
    })
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.post('/login', auth, async (req, res) => {
  try {
    res.redirect(req.session?.returnTo || '/')
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.get('/logout', (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err)
      res.redirect('/')
    })
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.get('/signup', (req, res) => {
  try {
    res.render('users/signup', {
      title: 'Регистрация',
      error: req.query?.error
    })
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.post('/signup', async (req, res) => {
  try {
    const result = await axios.post(url_api_user + '/signup', req.body)
    if (result.data?.error) {
      return res.redirect(`/signup?error=${result.data.error}`)
    }
    res.redirect('/login')
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

router.get('/user/profile', isAuthenticated, (req, res) => {
  try {
    res.render('users/profile', {
      title: 'Профаил',
      user: req.user,
      error: req.query?.error
    })
  } catch (e) {
    console.log(`Error: ${e}`)
    res.redirect('/404')
  }
})

module.exports = router
