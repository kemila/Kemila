const path = require('path');

module.exports = {
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/index.tsx')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: 'app/[name]_[hash:8].js', // 打包后文件
        chunkFilename: '[name]_[hash:4].chunk.js',
    },
    resolve: { // 指定第三方库目录，减少webpack寻找时间
        modules: [path.resolve(__dirname, '../node_modules')],
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
        splitChunks: {
            chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules\//,
                    name: 'page/vendor',
                    priority: 10,
                    enforce: true
                },
                commons: { // split `src`目录下被打包的代码到`page/commons.js && .css`
                    test: /src\//,
                    name: 'page/commons',
                    priority: 10,
                    minChunks: 2,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'page/manifest'
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(jpe?g|png|jpg|eot|woff|ttf|svg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[hash].[ext]',
                    outputPath: 'images/',
                },
            },
        ]
    }
}