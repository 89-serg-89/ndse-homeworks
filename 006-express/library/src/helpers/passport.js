const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user')
const getHash = require('./crypto')

/**
 * @param {String} login
 * @param {String} pass
 * @param {Function} done
 */
const verify = async (login, pass, done) => {
  try {
    const user = await userModel.findOne({ login })
    if (!user) return done(null, false)
    if (user.password !== getHash(pass)) return done(null, false)
    return done(null, user)
  } catch (e) {
    return done(e)
  }
}

const options = {
  usernameField: 'login',
  passwordField: 'password',
  passReqToCallback: false,
}

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url
    }
    console.log(req.session)
    return res.redirect('/login')
  }
  next()
}

const auth = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      if (req.originalUrl.indexOf('/api') > -1) {
        return res.send({error: 'Не верные данные для входа'})
      } else {
        return res.redirect('/login?error=Не верные данные для входа')
      }
    }

    // НУЖНО ВЫЗВАТЬ req.login()!!!
    req.login(user, next)
  })(req, res, next)
}

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify))

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => {
  cb(null, user._id?.toString())
})

passport.deserializeUser( async (id, cb) => {
  try {
    const user = await userModel.findById(id)
    if (!user) return cb(null, false)
    cb(null, user)
  } catch (e) {
    console.log(e)
    return cb(e)
  }
})

module.exports = {
  isAuthenticated,
  auth,
  passport
}
