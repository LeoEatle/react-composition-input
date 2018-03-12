
var path = require('path')

module.exports = {
    entry: {
        'demo/dist/index': './demo/src/index'
    },

    output: {
        path: '.',
        filename: '[name].js',
        publicPath: '/demo/dist/',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },

    devServer: {
        contentBase: './demo',
        host: 'localhost',
        inline: true,
        info: false,
    },
}