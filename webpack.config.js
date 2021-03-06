var webpack = require('webpack')
var getConfig = require('hjs-webpack')

var config = getConfig({
	in: 'src/app.js',
	out: 'public',
	clearBeforeBuild: false,
	// html: function(data) {
	// 	return {
	// 		'index.html': data.defaultTemplate({html: ''})
	// 	}
	// }
})

config.target = 'node-webkit'

// Adds new plugin to generated config which exposes underscore.js globally
config.plugins.push(
	new webpack.ProvidePlugin({
		_: "underscore"
	})
)

module.exports = config
