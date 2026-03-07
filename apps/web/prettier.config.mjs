// ESM required for prettier-plugin-tailwindcss 0.6+.
// Keep formatting options in sync with /prettier.config.js at repo root.
/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
