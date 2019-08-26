module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['*.js'],
      parser: 'espree'
    },
    {
        files: ['*.ts', '*.tsx'],
        extends: [
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: __dirname
        },
        plugins: [
          '@typescript-eslint',
          'react'
        ],
        rules: {
          '@typescript-eslint/array-type': ['error', {'array-simple': true }],
          '@typescript-eslint/no-unused-vars': 'off',
          'react/jsx-uses-react': 'error',
          'react/jsx-uses-vars': 'error',
        }
    }
  ]
}
