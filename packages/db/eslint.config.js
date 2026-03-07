// @ts-check
const tseslint = require('typescript-eslint')
const baseConfig = require('../../eslint.config.base.js')

module.exports = tseslint.config(
  { ignores: ['src/schema.ts'] },
  ...baseConfig,
  {
    rules: {
      'no-console': 'off',
    },
  }
)
