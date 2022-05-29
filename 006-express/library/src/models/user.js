const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
})

module.exports = model('Users', userSchema)
