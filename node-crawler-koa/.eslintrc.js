module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-proto': 0,
    'comma-dangle': [2, 'always-multiline'],
    'quotes': [1, 'single'],
    'arrow-parens': ["error", "as-needed"],
  }
}
