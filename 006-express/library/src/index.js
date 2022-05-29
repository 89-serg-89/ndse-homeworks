require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { createClient } = require('redis')
const RedisStore = require('connect-redis')(session)

const app = express()

const userApiRouter = require('./routes/api/user')
const booksApiRouter = require('./routes/api/books')
const booksRouter = require('./routes/books')
const errorsRouter = require('./routes/errors')

const passport = require('./helpers/passport')

const errorMiddleware = require('./middleware/error')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379', legacyMode: true })
redisClient.connect().catch(console.error)

app.use(cookieParser())

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'keyboard cat',
    resave: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

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

const init = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST || 'mongodb://localhost:27017/', {
      user: process.env.DB_USERNAME || 'root',
      pass: process.env.DB_PASSWORD || 'pass',
      dbName: process.env.DB_NAME || 'books',
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
