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
          '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
          '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
          '@typescript-eslint/member-delimiter-style': [
            'error',
            {
              multiline: { delimiter: "semi", requireLast: true },
              singleline: { delimiter: "comma", requireLast: false }
            }
          ],
          '@typescript-eslint/interface-name-prefix': 'off',
          'react/jsx-uses-react': 'error',
          'react/jsx-uses-vars': 'error'
        }
    }
  ]
}
