module.exports = {
  root: true,
  extends: ['../../.eslintrc.base.js'],
  ignorePatterns: ['db/generated.ts'],
  rules: {
    'no-console': 'off',
  },
}
