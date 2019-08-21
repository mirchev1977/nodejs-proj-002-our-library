const express = require( 'express' );

const t = require( '../utils/templates' );

const router = express.Router();


router.get( '', ( req, res, next ) => {
    t( 'homepage', {
        one: 'one-value',
        two: 'two-value',
        arr: [ 'title;author;issuedon','one;two;three', 'four;five;six' ]
    } ).then( html => {
        res.status( 200 ).setHeader( 'Content-Type', 'text/html' );
        res.write( html );
        res.end();
    } );
} );

module.exports = router;