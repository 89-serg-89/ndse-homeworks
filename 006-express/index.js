require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const userApiRouter = require('./routes/api/user')
const booksApiRouter = require('./routes/api/books')
const booksRouter = require('./routes/books')
const booksStore = require('./store/books')
const BookModel = require('./models/book')
const errorMiddleware = require('./middleware/error')

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/books', booksRouter)
app.use('/api/user', userApiRouter)
app.use('/api/books', booksApiRouter)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const initBook = () => {
  [1,2,3,4,5].forEach(item => {
    booksStore.push(new BookModel(
      `title ${item}`,
      `desc ${item}`,
      'Author',
      false,
      'demo.jpg',
      'fileName',
      'demo.txt'
      ))
  })
}
initBook()
