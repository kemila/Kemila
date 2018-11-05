const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    mode: process.env.NODE_ENV,
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:6090',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.tsx')
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                }],
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
                //loaders的处理顺序是从右向左，就是会先用sass-loader，其次css-loader，再次style-loader
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        overlay: {
            errors: true
        },
        // 设置localhost端口
        port: 5656,
        publicPath: "/",
        inline: true, // 自动刷新
        hot: true, // 开启热模块替换
        open: true,
        quiet: true // 不显示 devServer 的 Console 信息，让 FriendlyErrorsWebpackPlugin 取而代之
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new HtmlWebpackPlugin({
            title: 'Catalog',
            template: path.resolve(__dirname, '../index.html'),
            inject: true,
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 热替换插件
        new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
    ],
});