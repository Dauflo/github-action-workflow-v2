const fs = require('fs')

const res = JSON.parse('[".github/workflows/build.yaml","folder-b/.version"]').filter((file) => file.includes('.version') && fs.existsSync(`${file.split('/')[0]}/Dockerfile`))

console.log(res)

const test = res.map(elem => [elem.split('/')[0], fs.readFileSync(elem, 'utf-8')])

console.log(test)