require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const userApiRouter = require('./routes/api/user')
const booksApiRouter = require('./routes/api/books')
const booksRouter = require('./routes/books')
const errorsRouter = require('./routes/errors')

const BookModel = require('./models/book')

const errorMiddleware = require('./middleware/error')

const store = require('./helpers/store')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/', errorsRouter)
app.use('/books', booksRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

const port = process.env.PORT || 3000
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'pass';
const NameDB = process.env.DB_NAME || 'books'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

console.log(UserDB)
console.log(PasswordDB)
console.log(NameDB)
console.log(HostDb)

const init = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      user: UserDB,
      pass: PasswordDB,
      dbName: NameDB,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Соединение с БД успешно')
    app.listen(port, () => {
      console.log(`Library app listening on port ${port}`)
    })
  } catch ( e ) {
    console.warn(e.toString())
  }
}
init()
