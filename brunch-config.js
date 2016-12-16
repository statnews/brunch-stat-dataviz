module.exports = {
	// See http://brunch.io for documentation.
	files: {
		javascripts: { joinTo: 'app.js' },
		stylesheets: { joinTo: 'app.css' },
		templates: { joinTo: 'app.js' }
	},
	watcher: {
		usePolling: true
	},
	plugins: {
		postcss: {
			processors: [
				require('autoprefixer')(['last 8 versions'])
			]
		},
		afterBrunch: [
			'node stat-gitignore.js',
			'node stat-dataviz.js'
		]
	}
}
