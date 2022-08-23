const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (cwd, publicPath) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const analyze = !!process.env.ANALYZE;

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
        context: cwd,
        entry: ['regenerator-runtime', './src/entry.tsx'],
        output: {
            path: resolve(cwd, 'dist'),
            publicPath,
            filename: 'bundle.js',
        },
        mode: isProduction ? 'production' : 'development',
        resolve: {
            extensions: ['*', '.js', '.ts', '.tsx']
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
        devtool: isProduction ? false : "eval-source-map",
        devServer: {
            compress: true,
            contentBase: resolve(cwd, 'dist'),
            publicPath,
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
        plugins: getPlugins(isProduction, analyze, cwd),
    };
};

function getPlugins(isProduction, analyze, cwd) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
        }),
        new HtmlWebpackPlugin({
            filename: resolve(cwd, "dist", "index.html"),
            title: 'Boolet-Home',
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
            tsconfig: resolve(cwd, 'tsconfig.json')
        }));
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (analyze) {
        plugins.push(new BundleAnalyzerPlugin())
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
                }
            }
        ],
        '@babel/preset-typescript',
        '@babel/preset-react'
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
        ],
        [
            'babel-plugin-styled-components',
            {
                "ssr": false
            }
        ],
        'macros'
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
