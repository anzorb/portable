var webpack = require('webpack');
var baseConfig = require('./webpack.config.common.js');
var _ = require('lodash');
var config = require('./config.js');
var path = require('path');

process.env.BABEL_ENV = 'dev';

module.exports = _.extend(baseConfig, {
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../public'),
        library: config.appName,
        filename: 'portable.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        // hot: true,
        //publicPath: '/apps/floor-simulator/dist/',
        host: '127.0.0.1',
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
});