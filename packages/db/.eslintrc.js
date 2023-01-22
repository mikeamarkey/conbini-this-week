module.exports = {
  root: true,
  extends: ['../../.eslintrc.base.js', 'plugin:import/recommended'],
  ignorePatterns: ['src/schema.ts'],
  rules: {
    'no-console': 'off',
  },
}
