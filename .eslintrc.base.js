module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['**/node_modules', '**/dist', '**/build'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
  },
}
