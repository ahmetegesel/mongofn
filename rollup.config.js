const { babel } = require('@rollup/plugin-babel');
const del = require('rollup-plugin-delete');
const copy = require('rollup-plugin-copy');
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
    copy({ targets: [{ src: 'typings/**/*.d.ts', dest: 'dist/typings'}] }),
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
