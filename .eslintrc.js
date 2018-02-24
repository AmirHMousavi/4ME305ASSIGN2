module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types':0,
  },
};
