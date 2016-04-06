var scraper = require( 'website-scraper' );
var fs = require( 'fs' );
var cheerio = require( 'cheerio' );
var file;

scraper.scrape( {
	urls: [ 'https://stat.qa.wordpress.boston.com/2016/04/04/stat-dataviz-skeleton-post/' ],
	directory: 'app/assets/',
	subdirectories: [
		{
			directory: 'vendor/stat/img',
			extensions: [ '.png', '.jpg', '.jpeg', '.gif', '.svg' ]
		},
		{
			directory: 'vendor/stat/js',
			extensions: [ '.js' ]
		},
		{
			directory: 'vendor/stat/css',
			extensions: [ '.css' ]
		},
		{
			directory: 'vendor/stat/fonts',
			extensions: [ '.ttf', '.woff', '.woff2', '.eot' ]
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
} ).then( function( results ) {
	if ( results ) {
		file = this.options.directory + '/' + results[0].filename;
		loadSkeleton( processSkeleton );
	}
} ).catch( function( err ) {
	console.log( err.message );
} );

function loadSkeleton( callback ) {
	fs.readFile( file, 'utf8', callback );
}

function processSkeleton( err, data ) {
	if ( err ) {
		throw err;
	}

	data = removeScripts( data );
	data = adPlaceholders( data );

	writeSkeleton( data );
}

function writeSkeleton( data ) {
	fs.writeFile( file, data );
}

function removeScripts( data ) {
	var $ = cheerio.load( data ),
		i,
		scriptSrcs = [
			'vendor/stat/js/stat-dfp.js',
			'vendor/stat/js/sfp.js'
		],
		scriptContains = [
			'gpt.js',
			'dfpBreakpoints',
			'dfpBuiltMappings',
			'wp-emoji-release.min.js'
		];

	for ( i = 0; i < scriptSrcs.length; i ++ ) {
		$( 'script[src="' + scriptSrcs[i] + '"]' ).remove();
	}

	for ( i = 0; i < scriptContains.length; i ++ ) {
		$( 'script:contains("' + scriptContains[i] + '")' ).remove();
	}

	return $.html();
}

function adPlaceholders( data ) {
	var $ = cheerio.load( data );

	$( '#div-gpt-ad-ad_halfpage1' ).replaceWith( $( getPlaceholder( 300, 600 ) ) );

	return $.html();
}

function getPlaceholder( width, height ) {
	return  '<div style="box-sizing: border-box; width: ' + width + 'px; height: ' + height + 'px; background-color: #CCCCCC; text-align: center; padding-top: 1em; font-weight: bold;"><p style="color: #969696;">' + width + 'x' + height + '</p></div>';
}
