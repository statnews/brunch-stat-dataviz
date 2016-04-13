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

	data = data.replace( '# Assets folder from the scraper\n', '' );
	data = data.replace( 'app/assets/index.html\n', '' );
	data = data.replace( 'app/assets/vendor/\n', '' );

	fs.writeFile( '.gitignore', data );
}
