const redis = require('redis')
const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' })

const connect = async () => {
  try {
    await client.connect()
  } catch (e) {
    console.log(`Error redis connect: ${e}`)
  }
}

const get = async (key) => {
  try {
    return await client.get(key)
  } catch (e) {
    console.log(`Error redis: ${e}`)
  }
}

const set = async (key, data) => {
  try {
    return await client.set(key, data)
  } catch (e) {
    console.log(`Error redis: ${e}`)
  }
}

const incr = async (key) => {
  try {
    return await client.incr(key)
  } catch (e) {
    console.log(`Error redis: ${e}`)
  }
}

module.exports = {
  client,
  get,
  set,
  incr,
  connect
}
