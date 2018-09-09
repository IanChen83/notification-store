import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const packageName = 'NotificationStore'

const files = [
  {
    file: 'index.js',
    name: packageName,
  },
  {
    file: 'core.js',
    name: `${packageName}.connect`,
  },
  {
    file: 'subscriber.js',
    name: `${packageName}.createSubscriberStore`,
  },
  {
    file: 'store.js',
    name: `${packageName}.createStore`,
  },
]

const configs = files.map(({ file, name }) => ({
  input: `lib/${file}`,
  output: {
    dir: 'umd',
    format: 'umd',
    file,
    name,
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
}))

if (process.env.NODE_ENV === 'production') {
  configs.forEach(c => {
    c.plugins.push(terser())
    c.output.file = c.output.file.replace(/\.js$/, '.min.js')
  })
}

export default configs
