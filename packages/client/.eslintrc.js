const path = require('path');

module.exports = {
  extends: "./configs/.eslintrc.js",
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json')
      }
    }
  ]
};
