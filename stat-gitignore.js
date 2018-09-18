/**
 * Updates a dataviz project's .gitignore file so that project dependencies
 * can be addded to a repo (that's not the main skeleton repo). This script
 * bails out if it detects that it's running in the Brunch skeleton project.
 * Otherwise, this runs automatically everytime a brunch build is performed.
 */
var fs = require( 'fs' );

fs.readFile( '.gitignore', 'utf8', processIgnore );

/**
 * Remove app/assets/index.html & app/assets/vendor/ from .gitignore
 */
function processIgnore( err, data ) {
	if ( err ) {
		throw err;
	}

	if ( __dirname.includes( 'brunch-stat-dataviz' ) ) {
		// We only update .gitignore if we are not working in the master skeleton
		// repo.
		return;
	}

	data = data.replace( '# Brunch output folder.\n', '' );
	data = data.replace( 'public/\n', '' );
	data = data.replace( '# Assets folder from the scraper\n', '' );
	data = data.replace( 'app/assets/index.html\n', '' );
	data = data.replace( 'app/assets/vendor/\n', '' );

	fs.writeFile( '.gitignore', data, function( err ) {
		if ( err ) {
			throw err;
		}
	} );
}
