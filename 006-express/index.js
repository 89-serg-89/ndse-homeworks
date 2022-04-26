require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./routing/user')
const booksRouter = require('./routing/books')
const booksStore = require('./store/books')
const BookModel = require('./models/book')

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const initBook = () => {
  [1,2,3,4,5].forEach(item => {
    booksStore.push(new BookModel(
      `title ${item}`,
      `desc ${item}`,
      'Author',
      'favorite',
      'fileCover',
      'fileName'
      ))
  })
}
initBook()
