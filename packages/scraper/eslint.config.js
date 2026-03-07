// @ts-check
const tseslint = require('typescript-eslint')
const baseConfig = require('../../eslint.config.base.js')

module.exports = tseslint.config(...baseConfig, {
  rules: {
    'no-console': 'off',
  },
})
