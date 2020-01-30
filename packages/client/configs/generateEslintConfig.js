const path = require('path');

const generateEslintConfig = (cwd) => ({
    extends: "../../configs/.eslintrc.js",
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: path.join(cwd, './tsconfig.json')
            }
        }
    ]
});

module.exports = generateEslintConfig;
