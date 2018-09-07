const BABEL_ENV = process.env.BABEL_ENV
const disableModule = BABEL_ENV === undefined || BABEL_ENV !== 'cjs'

module.exports = {
  presets: [
    [
      'es2015',
      {
        loose: true,
        modules: disableModule ? false : 'commonjs',
      },
    ],
  ],
}
