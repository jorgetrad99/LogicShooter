const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:{
        home: path.resolve(__dirname, 'src/index.js')
    },
    mode: 'production',
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'src/index.html'
        })
    ]
}