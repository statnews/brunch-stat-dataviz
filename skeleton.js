var scraper = require('website-scraper');

scraper.scrape({
	urls: ['https://stat.qa.wordpress.boston.com/2016/04/04/stat-dataviz-skeleton-post/'],
	directory: 'app/assets/',
	subdirectories: [
		{directory: 'img', extensions: ['.jpg', '.png', '.svg']},
		{directory: 'js', extensions: ['.js']},
		{directory: 'css', extensions: ['.css']}
	 ],
  sources: [
		{selector: 'img', attr: 'src'},
		{selector: 'link[rel="stylesheet"]', attr: 'href'},
		{selector: 'script', attr: 'src'}
	  ]
}).then(console.log).catch(console.log);