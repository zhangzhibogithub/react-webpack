const path = require('path');
const webpack = require('webpack'); 
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins= [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //热加载
        new webpack.HotModuleReplacementPlugin()
    ]
if(process.env.ANALYSE){
    plugins.unshift(new BundleAnalyzerPlugin());
}


module.exports = {
    entry:'./index.jsx',

    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx','css','less'],
        alias: {
            '@assets': path.resolve('./src/assets')
        }
       
    },
    plugins,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        // 开启 hmr 支持
        hot: true,
        proxy: {}
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 20000
        },
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // jsx/js文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), {modules: false}]
                        ],
                        cacheDirectory: true
                    }
                }
            },
            {
                test:/\.less?$/,
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: [ MiniCssExtractPlugin.loader, 'css-loader','less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 3*1024 // 3k
                    }
                },'file-loader']
            }
        ]
    }
};