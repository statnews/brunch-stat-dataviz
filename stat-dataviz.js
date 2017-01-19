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
	version_file: 'public/version.json',
	init_module: 'initialize'
}

function getVersion() {
	var version,
		version_obj;

	version = fs.readFileSync( config.version_file, 'utf8' );

	version_obj = JSON.parse( version );

	return version_obj.versionExt;
}

function getMarkup( $, $dataviz ) {
	if ( ! $dataviz.length ) {
		return '';
	}

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

function getDataAttribs( $dataviz ) {
	var attrib,
		attribs,
		data_attribs = { };

	if ( ! $dataviz.length ) {
		return '';
	}

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

	$dataviz = $( '.stat-dataviz .media-content' ).children();

	meta = {
		version: getVersion(), // The current Brunch build version.
		markup: getMarkup( $, $dataviz ), // The dataviz container markup.
		javascripts: getJavascripts(), // Script bundle(s).
		stylesheets: getStylesheets(), // CSS bundle(s).
		data_attribs: getDataAttribs( $dataviz ), // Datviz container data attribs.
		init_module: config.init_module // Name of the require() entry point module.
	}

	fs.writeFile( config.meta_file, JSON.stringify( meta ), function( err ) {
		if ( err ) {
			throw err;
		}
	} );
}

fs.readFile( config.skel_file, 'utf8', generateMeta );
