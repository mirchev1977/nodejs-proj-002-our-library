const fs      = require( 'fs'   );
const path    = require( 'path' );
const rootDir = path.dirname( process.mainModule.filename );

function rewriteFile ( source, dest ) {
  const fullPath = path.join( rootDir, 'data', source );

  const interval = 15 * 60 * 1000;

  clearInterval();
  setInterval( function () {
    fs.readFile( source, 'utf-8', ( err, data ) => {
        if ( err ) {
            reject( err );
        }

        fs.writeFile( dest, data, ( err ) => {
          if ( err ) {
            console.log( 'error: ', err );
          }

          //console.log( 'written', dest );
        } );
    } ); 
  }, interval ); 
}

module.exports = {
  rewriteFile 
};
