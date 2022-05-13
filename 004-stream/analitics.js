const fs = require('fs')
const os = require('os')
const path = require('path')
const yargs = require('yargs')
const argv = yargs(process.argv.slice(2)).argv


const statistics = async () => {
  try {
    const fileName = argv['log-file']
    const pathFile = path.join(__dirname, `${fileName ?? path.parse(__filename).name}.log`)
    await fs.promises.access(pathFile, fs.constants.F_OK)
    const data = await fs.promises.readFile(pathFile, 'utf-8')
    const split = data
      .split(os.EOL)
      ?.map(i => i.split('|')[1]?.trim())
      .filter(i => i)
    const wins = split.filter(i => i === 'true').length
    const result = `
      Общее количество партий: ${split.length}
      Выигранных(${wins}) / проигранных(${split.length - wins}) партий
      Процентное соотношение выигранных партий: ${Math.round(wins / split.length * 100)}%
    `
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}

statistics()
