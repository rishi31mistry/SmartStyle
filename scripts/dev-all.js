const { spawn } = require('child_process')

const isWindows = process.platform === 'win32'
const children = []

function startProcess(name, command, args) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
  })

  child.on('exit', (code, signal) => {
    const reason = signal ? `signal ${signal}` : `code ${code}`
    console.log(`${name} exited with ${reason}`)
    shutdown(child)
  })

  child.on('error', (error) => {
    console.error(`Failed to start ${name}:`, error)
    shutdown(child)
  })

  children.push(child)
  return child
}

function shutdown(exitedChild) {
  for (const child of children) {
    if (child !== exitedChild && !child.killed) {
      child.kill('SIGINT')
    }
  }

  if (exitedChild && typeof exitedChild.exitCode === 'number') {
    process.exit(exitedChild.exitCode)
  }
}

process.on('SIGINT', () => {
  shutdown()
  process.exit(0)
})

process.on('SIGTERM', () => {
  shutdown()
  process.exit(0)
})

startProcess('backend', process.execPath, ['backend/server.js'])

if (isWindows) {
  startProcess('frontend', 'cmd.exe', ['/c', 'npm.cmd', 'run', 'dev:frontend'])
} else {
  startProcess('frontend', 'npm', ['run', 'dev:frontend'])
}
