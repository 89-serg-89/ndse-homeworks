const yargs = require('yargs')
const argv = yargs(process.argv.slice(2)).argv

const currDate = new Date() 
const add = (a, b) => {
  return a + b
}
const sub = (a, b) => {
  return a - b
}
const getParam = pr => argv[pr.find(i => argv[i])]
const modify = (operator) => {
  const modifyDate = (period, count) => new Date( currDate[`set${period}`]( (operator === 'add' ? add : sub)( currDate[`get${period}`](), count ) ) )
  if (getParam(['year', 'y'])) {
    modifyDate('FullYear', getParam(['year', 'y']))
  }
  if (getParam(['month', 'm'])) {
    modifyDate('Month', getParam(['month', 'm']))
  }
  if (getParam(['date', 'd'])) {
    modifyDate('Date', getParam(['date', 'd']))
  }
  result(currDate.toISOString())
}
const result = str => console.log(str)

argv._.forEach(item => {
  if (item === 'current') {
    if (getParam(['year', 'y'])) {
      result(currDate.getFullYear())
    } else if (getParam(['month', 'm'])) {
      result(currDate.getMonth() + 1)
    } else if (getParam(['date', 'd'])) {
      result(currDate.getDate())
    } else {
      result(currDate.toISOString())
    }
  } else if (['add', 'sub'].includes(item)) {
    modify(item)    
  }
})