const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devServerPort = 8081;

module.exports = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    const publicPath = '/';

    const fileLoaderOptions = {
        name: '[name]-[hash].[ext]',
        publicPath: `${publicPath}file-loader`,
        outputPath: 'file-loader/',
    };

    const urlLoaderOptions = Object.assign(fileLoaderOptions, { limit: 100000 });

    const scriptLoaders = [
        {
            loader: 'babel-loader',
            options: getBabelOptions(),
        },
    ];

    return {
        context: __dirname,
        entry: './src/entry.tsx',
        output: {
            path: resolve(__dirname, 'dist'),
            publicPath,
            filename: 'bundle.js',
        },
        mode: isProduction ? 'production' : 'development',
        resolve: {
            extensions: ['*', '.js', '.ts', '.tsx'],
            alias: {
                'src': resolve(__dirname, 'src'),
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
                {
                    test: /\.less/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: !isProduction,
                            },
                        },
                    ],
                }
            ],
        },
        devServer: {
            compress: true,
            contentBase: resolve(__dirname, 'dist'),
            publicPath,
            port: devServerPort,
            hot: true,
            historyApiFallback: true,
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
        },
        performance: {
            maxEntrypointSize: 1000000,
            maxAssetSize: 800000,
        },
        plugins: getPlugins(isProduction),
    };
};

function getPlugins(isProduction) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        }),
        new HtmlWebpackPlugin({
            filename: resolve(__dirname, "dist", "index.html"),
            title: 'Домашняя страница',
            meta: {
                viewport: 'user-scalable=no, width=device-width, initial-scale=1.0'
            },
        })
    ];

    if (isProduction) {
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true,
        }));
    } else {
        plugins.push(new ForkTsCheckerWebpackPlugin({
            tsconfig: resolve(__dirname, 'tsconfig.json'),
            tslint: isProduction ? undefined : resolve(__dirname, 'tslint.json'),
        }));
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
}

function getBabelOptions() {
    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    'browsers': 'last 2 versions',
                },
            },
        ],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ];

    const plugins = [
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        [
            '@babel/plugin-proposal-decorators',
            { 'legacy': true }
        ]
    ];

    // todo disable HMR in production
    plugins.push('react-hot-loader/babel');

    return {
        cacheDirectory: true,
        babelrc: false,
        presets,
        plugins,
    };
}
