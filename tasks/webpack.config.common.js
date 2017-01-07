var config = require('./config.js');
var path = require('path');
//var precss = require('precss');
//var autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        // preLoaders: [{
        //     test: /(\.js)$/,
        //     include: /(src)/,
        //     loaders: ['eslint'],
        // }],
        loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /(bower_components|node_modules)/,
                loader: 'babel-loader'
            }, {
                test: /\.scss$/,
                exclude: /(bower_components|node_modules)/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
    entry: config.entryPoint,
    // resolve: {
    //     extensions: ['.jsx', '.js']
    // },
    externals: {
        'mime': 'commonjs mime'
    },
    target: 'node-webkit',
    postcss: function() {
        return [precss, autoprefixer];
    }
};
