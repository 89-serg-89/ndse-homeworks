require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
console.log(process.env.REDIS_URL)
const redis = require('redis')
const client = redis.createClient({ url: 'redis://localhost' })

const counterRouter = require('./routes/counter')

const errorMiddleware = require('./middleware/error')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/counter', counterRouter)

app.use(errorMiddleware)

const init = async () => {
  try {
    await client.connect()
    app.listen(port, () => {
      console.log(`Counter app listening on port ${port}`)
    })
  } catch (e) {
    console.log(e)
  }

}

init()
