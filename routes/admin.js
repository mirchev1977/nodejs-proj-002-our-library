const express = require( 'express' );

const t       = require( '../utils/templates' );

const router = express.Router();

router.get( '/new-book', ( req, res, next ) => {
    res.send( '<h1>New Book</h1>' );
} );

module.exports = router;