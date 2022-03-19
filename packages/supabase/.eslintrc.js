module.exports = {
  root: true,
  extends: ['../../.eslintrc.base.js', 'plugin:import/recommended'],
  ignorePatterns: ['src/generate/api.ts'],
  rules: {
    'no-console': 'off',
  },
}
