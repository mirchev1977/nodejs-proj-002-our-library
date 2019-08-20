const express    = require( 'express'           );
const bodyParser = require( 'body-parser'       );
const t          = require( './utils/templates' );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );

app.get( '/', ( req, res, next ) => {
    res.status( 200 ).setHeader( 'Content-Type', 'text/html' );
    res.write( '<h1>Welcome to our Library!</h1>' );
    t( 'homepage', {
        one: 'one-value',
        two: 'two-value'
    } );
    res.send();
} );

app.listen( 3000 );