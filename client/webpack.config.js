const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');

const devServerPort = 8081;

module.exports = () => {
    const isProduction = process.env.WEBPACK_SERVE !== 'true';
    const publicPath = '/dist/';

    const fileLoaderOptions = {
        name: '[name]-[hash].[ext]',
        publicPath: `${publicPath}file-loader`,
        outputPath: 'file-loader/',
    };

    const urlLoaderOptions = Object.assign(fileLoaderOptions, { limit: 100000 });

    const scriptLoaders = [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
            },
        },
    ];

    return {
        context: __dirname,
        entry: './src/entry.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath,
        },
        mode: isProduction ? 'production' : 'development',
        resolve: {
            extensions: ['*', '.js', '.ts', '.tsx'],
            alias: {
                'src': path.join(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.([jt])sx?$/,
                    exclude: /node_modules/,
                    use: scriptLoaders,
                },
                {
                    test: /\.(png|gif|ttf|otf|svg|eot|woff|woff2)$/,
                    loader: 'url-loader',
                    options: urlLoaderOptions,
                },
                {
                    test: /\.jpg$/,
                    loader: 'file-loader',
                    query: fileLoaderOptions,
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                    ],
                },
            ],
        },
        serve: {
            content: path.join(__dirname, 'public'),
            devMiddleware: {
                publicPath,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            },
            port: devServerPort,
            hotClient: true,
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
        },
        performance: {
            maxEntrypointSize: 600000,
            maxAssetSize: 400000
        },
        plugins: getPlugins(isProduction),
    };
};

function getPlugins(isProduction) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.join(__dirname, 'tsconfig.json'),
            tslint: isProduction ? undefined : path.join(__dirname, 'tslint.json')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
        })
    ];

    if (isProduction) {
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
    }

    return plugins;
}
