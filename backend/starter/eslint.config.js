const globals = require('globals');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  files: ['**/*.js', 'src/**/*.js'],
  languageOptions: {
    sourceType: 'commonjs', // Change to 'module' for ES modules
    globals: globals.node
  },
  rules: {
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'indent': ['error', 2],
  }
};