const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'weseek',
    'weseek/react',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  env: {
    jquery: true,
    'jest/globals': true,
  },
  globals: {
    $: true,
    jquery: true,
    emojione: true,
    hljs: true,
    ScrollPosStyler: true,
    window: true,
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  settings: {
    // prevent import/no-unresolved
    // see: https://qiita.com/282Haniwa/items/76d56a6a7e9d0db95a33
    'import/resolver': {
      typescript: {
        config: path.join(__dirname, './webpack.config.js'),
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['JSXElement *', 'JSXElement', 'JSXAttribute', 'JSXSpreadAttribute'],
        ArrayExpression: 'first',
        FunctionDeclaration: { body: 1, parameters: 2 },
        FunctionExpression: { body: 1, parameters: 2 },
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    // It's not required since Next.js will automatically add `import React from 'react'`
    'react/react-in-jsx-scope': 'off',
  },
};
