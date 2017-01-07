var webpack = require('webpack');
var config = require('./config.js');
var path = require('path');
var baseConfig = require('./webpack.config.common.js');
var ManifestPlugin = require('webpack-manifest-plugin');
var _ = require('lodash');
process.env.BABEL_ENV = 'prod';

module.exports = _.extend(baseConfig, {
    output: {
        path: config.dist,
        library: config.appName,
        chunkFilename: 'floor-simulator.[id].[chunkhash].min.js',
        publicPath: '/apps/floor-simulator/dist/',
        filename: path.join(config.outputName + '.[hash].min.js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            mangle: {}
        }),
        new ManifestPlugin({
            fileName: 'floor-simulator.manifest.json',
            publicPath: ''
        })
    ]
});
