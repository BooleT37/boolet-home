const webpack = require('webpack');
const { resolve } = require('path');
const baseConfig = require('./configs/webpack.config')(__dirname);

process.env.NODE_CONFIG_DIR = resolve(__dirname, "config");
const config = require('config');

const modifiedConfig = {
    ...baseConfig,
    context: resolve(__dirname),
    resolve: {
        ...baseConfig.resolve,
        alias: {
            'src': resolve(__dirname, 'src'),
            'serverModels': resolve(__dirname, '../server/src/models')
        }
    },
    plugins: baseConfig.plugins.concat(
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(config.get('api.url'))
        })
    )
};

module.exports = modifiedConfig;
