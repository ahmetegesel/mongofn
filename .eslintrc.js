module.exports = {
  extends: ['airbnb-base'],
  plugins: ['import', 'node'],
  rules: {
    'max-len': ['error', 150, 2],
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    describe: false,
    test: false,
    expect: false,
    jest: false,
    beforeEach: false,
    it: false,
  },
};
