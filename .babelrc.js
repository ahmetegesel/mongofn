module.exports = {
  env: {
    es: {
      presets: [[
        '@babel/preset-env',
        {
          "targets": {
            "esmodules": true,
            "node": true,
          },
          "modules": false,
          "loose": true,
        }
      ]],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-throw-expressions',
      ]
    },
    cjs: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-throw-expressions',
      ]
    }
  }
}
