const express    = require( 'express'           );
const bodyParser = require( 'body-parser'       );

const routesLibrary = require( './routes/library' );

const app = express();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( routesLibrary );

app.listen( 3000 );