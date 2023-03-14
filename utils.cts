export function toPosixPath(path: string): string {
  const pathPosix = path.split('\\').join('/')
  assertPosixPath(pathPosix)
  return pathPosix
}

export function assertPosixPath(path: string): void {
  const errMsg = (msg: string) => `Not a posix path: ${msg}`
  assert(path !== null, errMsg('null'))
  assert(typeof path === 'string', errMsg(`typeof path === '${typeof path}'`))
  assert(path !== '', errMsg('(empty string)'))
  assert(path)
  assert(!path.includes('\\'), errMsg(path))
}

export function assert(condition: unknown, debugInfo?: string): asserts condition {
  if (condition) return
  const githubRepository = 'https://github.com/brillout/require-shim'
  let errMsg = [
    '[@brillout/require-shim]',
    'You stumbled upon a bug.',
    `Go to ${githubRepository}/issues/new and copy-paste this error.`,
    debugInfo
  ]
    .filter(Boolean)
    .join(' ')
  throw new Error(errMsg)
}

export function assertIsNotBrowser() {
  assert(!isBrowser())
}

function isBrowser() {
  // Using `typeof window !== 'undefined'` alone is not enough because some users use https://www.npmjs.com/package/ssr-window
  return typeof window !== 'undefined' && typeof window.scrollY === 'number'
}

export function pathJoin(path1: string, path2: string): string {
  assert(!path1.includes('\\'))
  assert(!path2.includes('\\'))
  let joined = [...path1.split('/'), ...path2.split('/')].filter(Boolean).join('/')
  if (path1.startsWith('/')) joined = '/' + joined
  return joined
}

export function isVitest(): boolean {
  return typeof process !== 'undefined' && typeof process.env !== 'undefined' && 'VITEST' in process.env
}

export function getGlobalObject<T extends Record<string, unknown> = never>(
  // We use the filename as key; each `getGlobalObject()` call should live in a unique filename.
  key: `${string}.ts`,
  defaultValue: T
): T {
  const allGlobalObjects = (globalThis.__brillout_require_shim = globalThis.__brillout_require_shim || {})
  const globalObject = (allGlobalObjects[key] = (allGlobalObjects[key] as T) || defaultValue)
  return globalObject
}
declare global {
  var __brillout_require_shim: undefined | Record<string, Record<string, unknown>>
}
