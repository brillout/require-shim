console.log('a.cjs')
console.log('isShim', require.isShim)
require('./require-shim.cjs')
//globalThis.require = require
console.log('isShim', require.isShim)
import('./b/b.mjs')
