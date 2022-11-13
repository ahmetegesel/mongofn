const { babel } = require('@rollup/plugin-babel');
const del = require('rollup-plugin-delete');

exports.default = {
  input: './src/index.js',
  plugins: [
    del({ targets: 'dist/*' }),
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
};
