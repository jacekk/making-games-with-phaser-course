const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules'],
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new CopyWebpackPlugin([
            { from: 'index.html' },
            { from: 'index.css' },
            { from: 'assets', to: 'assets' },
        ]),
    ],
}
