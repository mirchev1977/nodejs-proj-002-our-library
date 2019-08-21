const fs      = require( 'fs'      );
const express = require( 'express' );

const t = require( '../utils/templates' );

const router = express.Router();


router.get( '', ( req, res, next ) => {
    let fileData = '';
    fs.readFile( './data/books.txt', 'utf-8', ( err, data ) => {
        if ( err ) {
            debugger;
        }

        fileData += data;

        const arrData = fileData.split( /\n/ );
        arrData.pop();

        t( 'homepage', {
            one: 'one-value',
            two: 'two-value',
            arr: arrData 
        } ).then( html => {
            res.status( 200 ).setHeader( 'Content-Type', 'text/html' );
            res.write( html );
            res.end();
        } );
    } );
} );

module.exports = router;