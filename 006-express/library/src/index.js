require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

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

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`)
})

const initBook = async () => {
  const data = await store.get('books')
  if (data.length) return

  for (let i = 1; i < 6; i++) {
    await store.set('books', new BookModel(
      `title ${i}`,
      `desc ${i}`,
      'Author',
      false,
      'demo.jpg',
      'fileName',
      'demo.txt'
    ))
  }
}
initBook()
