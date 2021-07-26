module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [2, { ts: 'never' }],
    'import/prefer-default-export': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'no-console': 0,
    '@typescript-eslint/explicit-module-boundary-types': [2, {
      allowHigherOrderFunctions: true,
    }],
    'no-bitwise': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
