const execSync = require('child_process').execSync

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

// Build CommonJS modules
console.log('Building CommonJS modules ...')
exec('babel lib -d . --ignore __tests__', {
  BABEL_ENV: 'cjs',
})

// Build ES modules
console.log('\nBuilding ES modules ...')
exec('babel lib -d es --ignore __tests__', {
  BABEL_ENV: 'es',
})

// Build UMD modules
console.log('\nBuilding UMD modules ...')
exec('rollup -c -f umd -o umd/notifier.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
})

// Build UMD modules
console.log('\nBuilding UMD production modules ...')
exec('rollup -c -f umd -o umd/notifier.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
})
