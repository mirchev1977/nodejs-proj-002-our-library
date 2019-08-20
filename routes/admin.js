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

module.exports = router;