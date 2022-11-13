const { babel } = require('@rollup/plugin-babel');
const del = require('rollup-plugin-delete');
const resolve = require('@rollup/plugin-node-resolve');

exports.default = {
  input: './src/index.js',
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    babel({
      babelrc: true,
      comments: true,
    }),
  ],
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: ['mongodb', 'ramda'],
};
