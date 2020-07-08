module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  plugins: ['import', 'node'],
  rules: {
    'max-len': ['error', 150],
  },
};
