var scraper = require('website-scraper');
	scraper.scrape({
	urls: ['https://stat.qa.wordpress.boston.com/2016/04/04/stat-dataviz-skeleton-post/'],
		directory: 'app/assets/',
		subdirectories: [
			{
				directory: 'vendor/stat/img',
				extensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg']
			},
			{
				directory: 'vendor/stat/js',
				extensions: ['.js']
			},
			{
				directory: 'vendor/stat/css',
				extensions: ['.css']
			},
			{
				directory: 'vendor/stat/fonts',
				extensions: ['.ttf', '.woff', '.woff2', '.eot']
			}
		],
		sources: [
			{ selector: 'img',
				attr: 'src'
			},
			{
				selector: 'input',
				attr: 'src'
			},
			{
				selector: 'object',
				attr: 'data'
			},
			{
				selector: 'embed',
				attr: 'src'
			},
			{
				selector: 'param[name="movie"]',
				attr: 'value'
			},
			{
				selector: 'script',
				attr: 'src'
			},
			{
				selector: 'link[rel="stylesheet"]',
				attr: 'href'
			},
			{
				selector: 'link[rel*="icon"]',
				attr: 'href'
			}
		]
		}).then(console.log).catch(console.log);