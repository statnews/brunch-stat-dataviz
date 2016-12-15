var scraper = require( 'website-scraper' );
var fs = require( 'fs' );
var cheerio = require( 'cheerio' );
var file;

scraper.scrape( {
	urls: [ 'https://www.statnews.com/2016/03/25/zika-globe-interactive/' ],
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
	],
	urlFilter: function( url ) {
		// Don't save the ComScore tracking pixel.
		// This would otherwise be saved to app/assets/p2.
		return ( url.indexOf( 'scorecardresearch.com' ) === -1 );
	}
} ).then( function( results ) {
	if ( results ) {
		file = this.options.directory + '/' + results[0].filename;
		fs.readFile( file, 'utf8', processSkeleton );
	}
} ).catch( function( err ) {
	console.log( err.message );
} );

function processSkeleton( err, data ) {
	if ( err ) {
		throw err;
	}

	data = removeScripts( data );
	data = removeStyles( data );
	data = removeMeta( data );
	data = removeLinkRels( data );
	data = adPlaceholders( data );
	data = addAppScripts( data );
	data = addRobotsMeta( data );
	data = replaceContent( data );

	fs.writeFile( file, data );
}

function removeScripts( data ) {
	var $ = cheerio.load( data ),
		i,
		scriptSrcs = [
			'vendor/stat/js/stat-dfp.js',
			'vendor/stat/js/sfp.js',
			'vendor/stat/js/bostonglobemedia.js',
			'vendor/stat/js/AppMeasurement.js',
			'vendor/stat/js/stat-adobe-analytics.js',
			'vendor/stat/js/zikaglobe.min.js',
			'vendor/stat/js/trendmd.min.js'
		],
		scriptContains = [
			'gpt.js',
			'dfpBreakpoints',
      'statGlobal.dfp',
			'dfpBuiltMappings',
			'wp-emoji-release.min.js',
			'TrendMD.register', // TrendMD
			'_sf_startpt', // Chartbeat
			'loadChartbeat', // Chartbeat
			'ml314.com', // Bombora
			's_code' // Omniture
		];

	for ( i = 0; i < scriptSrcs.length; i ++ ) {
		$( 'script[src="' + scriptSrcs[i] + '"]' ).remove();
	}

	for ( i = 0; i < scriptContains.length; i ++ ) {
		$( 'script:contains("' + scriptContains[i] + '")' ).remove();
	}

	return $.html();
}

function removeStyles( data ) {
	var $ = cheerio.load( data ),
		i,
		linkHrefs = [
			'vendor/stat/css/zikaglobe.css'
		];

	for ( i = 0; i < linkHrefs.length; i ++ ) {
		$( 'link[href="' + linkHrefs[i] + '"]' ).remove();
	}

	return $.html();
}

function removeMeta( data ) {
	var $ = cheerio.load( data ),
		meta = [
			'description',
			'robots',
			'og:locale',
			'og:type',
			'og:title',
			'og:description',
			'og:url',
			'og:site_name',
			'article:publisher',
			'article:section',
			'article:published_time',
			'article:modified_time',
			'og:updated_time',
			'fb:app_id',
			'og:image',
			'twitter:card',
			'twitter:description',
			'twitter:title',
			'twitter:site',
			'twitter:image',
			'twitter:creator',
			'news_keywords',
			'msapplication-TileImage',
			'article:author',
			'article:tag'
		];

	for ( var i = 0; i < meta.length; i ++ ) {
		$( 'meta[property="' + meta[i] + '"]' ).remove();
		$( 'meta[name="' + meta[i] + '"]' ).remove();
	}

	$( 'html' ).removeAttr( 'prefix' );

	return $.html();
} 

function removeLinkRels( data ) {
	var $ = cheerio.load( data ),
		rels = [
			'profile',
			'pingback',
			'original-source',
			'canonical',
			'alternate',
			'https://api.w.org/',
			'EditURI',
			'wlwmanifest',
			'shortlink'
		];

	for ( var i = 0; i < rels.length; i ++ ) {
		$( 'link[rel="' + rels[i] + '"]' ).remove();
	}

	return $.html();
}

function addAppScripts( data ) {
	var $ = cheerio.load( data );

	$( 'head' ).append( '<link rel="stylesheet" href="app.css" type="text/css" media="screen">' + "\n" );
	$( 'body' ).append( '<script src="app.js"></script><script>require(\'initialize\');</script>' + "\n" );

	return $.html();
}

function addRobotsMeta( data ) {
	var $ = cheerio.load( data );

	$( 'head' ).append( '<meta name="robots" content="noindex">' + "\n" );

	return $.html();
}

function adPlaceholders( data ) {
	var $ = cheerio.load( data );

	$( '#div-gpt-ad-ad_halfpage1' ).replaceWith( $( getPlaceholder( 300, 600 ) ) );

	return $.html();
}

function getPlaceholder( width, height ) {
	// https://mdn.io/template-literals
	return `
		<div style="box-sizing: border-box; width: ${width}px; height: ${height}px; background-color: #CCCCCC; text-align: center; padding-top: 1em; font-weight: bold;">
			<p style="color: #969696;">${width}x${height}</p>
		</div>
		`;
}

function getRandomInt(min, max) {
	// From https://mdn.io/math-random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function replaceContent( data ) {
	var $ = cheerio.load( data ),
		title = 'STAT Dataviz Skeleton',
		vizNum = getRandomInt(0, 9999999);

	$( 'title' ).text( title );
	$( '.header-inner .article-title' ).text( title );
	$( '.content-header .post-title h1' ).text( title );
	// If .post-widgets is removed, the sidebar won't initalize properly.
	$( '.post-widgets' ).html( '' );
	$( 'article.content-article' ).html( `
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

		<!-- Dataviz container start -->
		<div class="stat-dataviz media media-break">
			<div class="media-content">
				<div class="dataviz-${vizNum}">
					<p><strong>Visualization code goes here.</strong> Please target JS and CSS to the <code>.dataviz-${vizNum}</code> class.</p>
					<p>Each data visualization gets a unique CSS class so that multiple visualizations can appear on the same page.</p>
				</div>
			</div>
			<figcaption class="media-label">
				<cite class="media-credit">Test Author/STAT</cite>
				<span class="media-source">Source: <a href="#">Test Source</a></span>
			</figcaption>
		</div>
		<!-- Dataviz container end -->

	` );

	return $.html();
}
