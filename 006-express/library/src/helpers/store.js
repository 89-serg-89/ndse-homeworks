const fs = require('fs')
const path = require('path')

const get = (storeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.promises.readFile(path.join(__dirname, '..', '/store', `${storeName}.json`), 'utf-8')
      resolve(JSON.parse(data).data)
    } catch (e) {
      reject(e)
    }
  })
}

const getById = (storeName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.promises.readFile(path.join(__dirname, '..', '/store', `${storeName}.json`), 'utf-8')
      resolve(JSON.parse(data).data.find(i => i.id === id))
    } catch (e) {
      reject(e)
    }
  })
}

const set = async (storeName, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const content = await fs.promises.readFile(path.join(__dirname, '..', '/store', `${storeName}.json`), 'utf-8')
      const json = JSON.parse(content)
      json.data.push(payload)
      await fs.promises.writeFile(path.join(__dirname, '..', '/store', `${storeName}.json`), JSON.stringify(json, null, 2))
      resolve(true)
    } catch (e) {
      reject(e)
    }
  })
}

const put = async (storeName, id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) throw new Error('not id')
      const content = await fs.promises.readFile(path.join(__dirname, '..', '/store', `${storeName}.json`), 'utf-8')
      const json = JSON.parse(content)
      const idxElem = json.data.findIndex(i => i.id === id)
      if (idxElem > -1) {
        json.data[idxElem] = { ...json.data[idxElem], ...payload }
        await fs.promises.writeFile(path.join(__dirname, '..', '/store', `${storeName}.json`), JSON.stringify(json, null, 2))
        resolve(true)
      }
      resolve(false)
    } catch (e) {
      reject(e)
    }
  })
}

const deleteById = (storeName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const content = await fs.promises.readFile(path.join(__dirname, '..', '/store', `${storeName}.json`), 'utf-8')
      const json = JSON.parse(content)
      const oldLength = json.data.length
      json.data = json.data.filter(i => i.id !== id)
      await fs.promises.writeFile(path.join(__dirname, '..', '/store', `${storeName}.json`), JSON.stringify(json, null, 2))
      resolve(oldLength - json.data.length)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  get,
  getById,
  set,
  put,
  deleteById
}
