const express = require( 'express' );

const t       = require( '../utils/templates' );

const router = express.Router();

router.get( '/new-book', ( req, res, next ) => {
    t( 
        'admin/new-book', {
            one: 'one-value',
            two: 'two-value'
        }
    ).then( newBookHtml => {
        res.send( newBookHtml ); 
    } );
} );

router.post( '/new-book', ( req, res, next ) => {
    res.statusCode = 200;
    res.setHeader( 'Content-Type', 'text/html' );
    res.write( '<h1>' );
    res.write( req.body[ 'book-title' ] );
    res.write( '</h1>' );
    res.write( '<h1>' );
    res.write( req.body[ 'book-author' ] );
    res.write( '</h1>' );
    res.write( '<h1>' );
    res.write( req.body[ 'book-issuedon' ] );
    res.write( '</h1>' );
    res.end();
} );

module.exports = router;