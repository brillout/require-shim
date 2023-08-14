import { assert } from './utils.cjs'

testRequireShim()

function testRequireShim() {
  let req: NodeRequire | undefined

  // This code can end up being ESM if it's bundled
  try {
    req = require
  } catch {}
  if (!req) return

  // Ensure that our globalThis.require doesn't overwrite the native require() implementation
  assert(!('_is_brillout_require_shim' in require))
}
