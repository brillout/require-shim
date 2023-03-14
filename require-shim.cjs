addRequireShim()

function addRequireShim() {
  const req = require
  const mod = req('module')
  const path = req('path')
  Object.defineProperty(globalThis, 'require', {
    get() {
      let callerFile
      {
        const prepareStackTraceOrg = Error.prepareStackTrace
        Error.prepareStackTrace = (_, stack) => stack
        const err = new Error()
        const stack = err.stack
        Error.prepareStackTrace = prepareStackTraceOrg
        const caller = stack[1]
        const fileName = caller.getFileName()
        callerFile = fileName
      }
      console.log('callerFile', callerFile)
      const req = mod.createRequire(callerFile)
      req.isShim = true
      return req
    }
  })
}
