const express    = require( 'express'           );
const bodyParser = require( 'body-parser'       );

const routesLibrary = require( './routes/library' );
const routesAdmin   = require( './routes/admin'   );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( '/',      routesLibrary );
app.use( '/admin', routesAdmin   );

app.listen( 3000 );