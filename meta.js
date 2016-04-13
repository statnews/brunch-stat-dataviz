var brunch_config = require( './brunch-config' );
var fs = require( 'fs' );
var cheerio = require( 'cheerio' );
var meta_file = 'app/stat-dataviz.json';
var skel_file = 'public/index.html';

function getMarkup() {
	fs.readFile( skel_file, 'utf8', function( err, data ) {
		var $,
			dataviz_chart;

		if ( err ) {
			throw err;
		}

		$ = cheerio.load( data );

		dataviz_chart = $( '#dataviz-chart' );

		if ( dataviz_chart.length ) {
			return dataviz_chart.html();
		}

		return '';
	} );
}

function getJavascripts() {
	return [ brunch_config.files.javascripts.joinTo ];
}

function getStylesheets() {
	return [ brunch_config.files.stylesheets.joinTo ];
}

function generateMeta() {
	var meta = {
		stat_dataviz: {
			version: '1.0',
			meta: {
				markup: getMarkup(),
				javascripts: getJavascripts(),
				stylesheets: getStylesheets(),
				data_attribs: { }
			}
		}
	}

	return JSON.stringify( meta );
}

console.dir( generateMeta() );