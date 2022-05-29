const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/user')

/**
 * @param {String} login
 * @param {String} pass
 * @param {Function} done
 */
const verify = async (login, pass, done) => {
  try {
    const user = await userModel.find({ login })
    if (!user) return done(null, false)
    if (user.password !== pass) return done(null, false)
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

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify))

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser( async (id, cb) => {
  try {
    const user = await userModel.findById(id)
    if (!user) return cb(null, false)
    cb(null, user)
  } catch (e) {
    return cb(e)
  }
})

module.exports = passport
