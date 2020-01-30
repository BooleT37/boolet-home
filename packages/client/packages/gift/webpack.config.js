const baseConfig = require('../../configs/webpack.config')(__dirname);

module.exports = {
    ...baseConfig,
    output: {
        ...baseConfig.output,
        publicPath: '/gift'
    }
};
