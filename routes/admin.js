const fs      = require( 'fs'      );
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
    const _line =
        `${req.body[ 'book-title' ]};`
        + `${req.body[ 'book-author' ]};`
        + `${req.body[ 'book-issuedon' ]}\n` 

    fs.appendFile( './data/books.txt', _line, ( err ) => {
        if ( err ) {
            debugger;
        }
        res.redirect( '/' );
    } );
} );

module.exports = router;