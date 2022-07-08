module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['simple-import-sort', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended' // configures eslint-config-prettier too
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-var': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'warn',
    'unicorn/filename-case': ['error', { case: 'camelCase', ignore: ['rabbitMQ'] }],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/prefer-string-replace-all': 'warn',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/prefer-at': 'error',
    'unicorn/prefer-node-protocol': 'error'
  },
  overrides: [
    {
      files: ['**/__tests__/*.?(c,m)js?(x)', '**/*.spec.?(c,m)js?(x)', 'jest.config.js'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      rules: {
        'jest/require-hook': 'off',
        'jest/no-hooks': 'off',
      }
    }
  ]
};
