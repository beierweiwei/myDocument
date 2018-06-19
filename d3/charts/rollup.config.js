// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};