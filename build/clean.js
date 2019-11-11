var shell = require('shelljs')

shell.rm('-rf', '.cache')
console.log('/.cache cleaned')

shell.rm('-rf', 'Dist')
console.log('/dist cleaned')
