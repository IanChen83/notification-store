const execSync = require('child_process').execSync

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

// Clean CommonJS modules
exec('rm -f index.js core.js subscriber.js store.js')

// Clean ES modules
exec('rm -rf es')

// Clean UMD modules
exec('rm -rf umd')
