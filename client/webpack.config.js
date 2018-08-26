const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
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
    const tsConfigFile = path.join(__dirname, 'tsconfig.json');

    const typeScriptLoaders = [
        {
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            }
        }
    ];
    if (!isProduction) {
        typeScriptLoaders.push({
            loader: 'tslint-loader',
            options: {
                tsConfigFile,
                typeCheck: true,
            }
        });
    }

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
                    use: typeScriptLoaders,
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
                        isProduction ?  MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !isProduction
                            }
                        }
                    ]
                }
            ],
        },
        serve: {
            content: path.join(__dirname, "public"),
            devMiddleware: {
                publicPath,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            },
            port: devServerPort,
            hotClient: true
        },
        plugins: getPlugins(isProduction),
    };
};

function getPlugins(isProduction, tsConfigFile) {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: tsConfigFile,
            tslint: path.join(__dirname, 'tslint.json')
        })
    ];

    if (isProduction) {
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true,
        }));
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production'
        }));
    }

    return plugins;
}
