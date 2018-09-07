import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'Notifier',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser())
}

export default config
