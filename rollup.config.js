import clear from 'rollup-plugin-clear'
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const dist = 'lib'
const bundle = 'bundle'

export default {
  input: 'src/index.js',
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm',
    },
    {
      file: `${dist}/${bundle}.umd.min.js`,
      format: 'umd',
      name: 'ReduxHotModule',
      globals: {
        'react-redux': 'ReactRedux',
      },
      plugins: [terser()],
    },
  ],
  external: ['react-redux'],
  plugins: [
    clear({
      targets: [dist],
      watch: true,
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
}
