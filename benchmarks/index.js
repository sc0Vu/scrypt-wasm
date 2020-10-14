const benchmark = require('benchmark')
const scryptJS = require('scrypt-js')
const scrypt = require('scrypt')
const nodeScrypt = require('crypto').scryptSync
const N = 1024
const R = 8
const P = 1
const KLEN = 32
const password = Buffer.from('mypassword')
const salt = Buffer.from('saltysalt')

new benchmark.Suite('Scrypt')
  .add('Scrypt JS', () => {
    scryptJS.syncScrypt(password, salt, N, R, P, KLEN);
  })
  .add('Scrypt', async () => {
    scrypt.hashSync(password, {
      N: N,
      r: R,
      p: P
    }, KLEN, salt);
  })
  .add('Scrypt node official ', () => {
    nodeScrypt(password, salt, KLEN, {
      N: N,
      r: R,
      p: P
    });
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log(`${this.name}: fastest is ${this.filter('fastest').map('name')}`)
    process.exit();
  })
  .run()
