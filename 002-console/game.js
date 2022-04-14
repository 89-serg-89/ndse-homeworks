const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
let min, max

const isNumber = val => {
  const num = Number(val)
  if (isNaN(num)) {
    console.log('Пиши число!')
    return false
  }
  return true
}

const inputMin = () => {
  return new Promise((resolve) => {
    rl.question('Добро пожаловать! Укажи минимальное число: ', val => {
      if (isNumber(val)) {
        min = Number(val)
        resolve()
        return
      }
      return init()
    })
  })
}

const inputMax = () => {
  return new Promise((resolve) => {
    rl.question('Укажи максимальное число: ', val => {
      if (isNumber(val)) {
        max = Number(val)
        resolve()
        return
      }
      return init()
    })
  })
}

const init = async () => {
  await inputMin()
  await inputMax()

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(`Отлично, давай попробуем отгадать число: от ${min} до ${max}`)
  
  rl.on('line', val => {
    if (!isNumber(val)) return    
    if (randomNum > val) {
      console.log('Ищи число больше')
    } else if (randomNum < val) {
      console.log('Ищи число меньше')
    } else {
      console.log('Бинго, попал!')
      rl.close()
    }
  })
  
  rl.on('close', () => {
    console.log('Спасибо что воспользовался моим приложением!')
  })
}

init()