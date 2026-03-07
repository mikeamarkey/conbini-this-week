// @ts-check
const tseslint = require('typescript-eslint')
const importPlugin = require('eslint-plugin-import')
const js = require('@eslint/js')
const globals = require('globals')

/** @type {import('typescript-eslint').ConfigArray} */
module.exports = tseslint.config(
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },
  { languageOptions: { globals: { ...globals.node } } },
  js.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'no-console': [2, { allow: ['warn', 'error'] }],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        'error',
        { alphabetize: { order: 'asc', caseInsensitive: true } },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  }
)
