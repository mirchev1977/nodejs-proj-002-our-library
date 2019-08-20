const express    = require( 'express'           );
const bodyParser = require( 'body-parser'       );
const t          = require( './utils/templates' );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );

app.get( '/', ( req, res, next ) => {
    t( 'homepage', {
        one: 'one-value',
        two: 'two-value'
    } ).then( html => {
        res.status( 200 ).setHeader( 'Content-Type', 'text/html' );
        res.write( html );
        res.end();
    } );
} );

app.listen( 3000 );