require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const axios = require('axios')

const { passport } = require('./helpers/passport')
const socketConnect = require('./helpers/socket')
const redisClient = require('./helpers/redis')

const app = express()
const server = http.createServer(app)
redisClient.connect()
socketConnect(server)

const userApiRouter = require('./routes/api/user')
const booksApiRouter = require('./routes/api/books')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')
const usersRouter = require('./routes/users')
const errorsRouter = require('./routes/errors')

const errorMiddleware = require('./middleware/error')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(cookieParser())

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'netology course',
    resave: true,
    cookie: { secure: false }
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
app.use('/', usersRouter)
app.use('/', indexRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

axios.default.withCredentials = true

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
    server.listen(port, () => {
      console.log(`Library app listening on port ${port}`)
    })
  } catch ( e ) {
    console.warn(e.toString())
  }
}
init()
