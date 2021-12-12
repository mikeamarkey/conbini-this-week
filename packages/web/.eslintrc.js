module.exports = {
  root: true,
  extends: ['../../.eslintrc.base.js', 'next/core-web-vitals', 'prettier'],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['out/*', '.next/*'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
  },
}
