const { resolve } = require('path');
const baseConfig = require('../../configs/webpack.config')(__dirname);

process.env.NODE_CONFIG_DIR = resolve(__dirname, "config");

module.exports = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        publicPath: '/english-tasks'
    }
};
