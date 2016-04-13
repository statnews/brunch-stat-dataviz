/**
 * Outputs the stat-dataviz.json to a file. This runs automatically every time
 * a Brunch build is performed.
 */
var brunch_config = require( './brunch-config' );
var fs = require( 'fs' );
var cheerio = require( 'cheerio' );
var minify = require( 'html-minifier' ).minify;

// These default config values can be updated on a per-project basis if necessary.
var config = {
	skel_file: 'public/index.html',
	dataviz_div_id: 'dataviz-chart',
	meta_file: 'public/stat-dataviz.json',
	init_module: 'initialize'
}

function getMarkup( $, $dataviz ) {
	return minify( $.html( $dataviz ), {
		collapseWhitespace: true
	} );
}

function getJavascripts() {
	return [ brunch_config.files.javascripts.joinTo ];
}

function getStylesheets() {
	return [ brunch_config.files.stylesheets.joinTo ];
}

function getDataAttribs( $, $dataviz ) {
	var attrib,
		attribs,
		data_attribs = { };

	attribs = $dataviz[0].attribs;

	for ( attrib in attribs ) {
		if ( attrib.includes( 'data' ) ) {
			data_attribs[attrib] = attribs[attrib];
		}
	}

	return data_attribs;
}

function generateMeta( err, data ) {
	var $, $dataviz,
		meta;

	if ( err ) {
		throw err;
	}

	$ = cheerio.load( data );

	$dataviz = $( '#' + config.dataviz_div_id );

	if ( ! $dataviz.length ) {
		console.log( 'Configured dataviz_div_id (' + config.dataviz_div_id + ') does not yet exist in ' + config.skel_file );
		return;
	}

	meta = {
		stat_dataviz: {
			version: '1.0',
			meta: {
				markup: getMarkup( $, $dataviz ),
				javascripts: getJavascripts(),
				stylesheets: getStylesheets(),
				data_attribs: getDataAttribs( $, $dataviz ),
				init_module: config.init_module
			}
		}
	}

	fs.writeFile( config.meta_file, JSON.stringify( meta ), function( err ) {
		if ( err ) {
			throw err;
		}
	} );
}

fs.readFile( config.skel_file, 'utf8', generateMeta );
