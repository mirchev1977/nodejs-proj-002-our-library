const fs = require( 'fs' );

const temp = ( _path, _data ) => {
    const promise = new Promise( ( resolve, reject ) => {
        let fileString = '';
        fs.readFile( `./views/${_path}.html`, ( err, data ) => {
            if ( err ) {
                reject( err );
            }

            fileString += data;


            if ( 
                Object.keys(_data).length === 0 
                && _data.constructor === Object 
            ) {
                resolve( fileString );
            } else { 
                Object.keys( _data ).forEach( ( _key ) => {
                    fileString 
                        = fileString.replace(
                                new RegExp( `/${_key}/`, 'g'), _data[ _key ] 
                            );
                } );

                console.log( fileString, _data );
            }
        } ); 
    } );

    return promise;
};

const template = ( _path, _data ) => {
    let _header;
    let _footer;
    temp( 'header', {} ).then( header => {
        return header;
    } ).then( header => {
        _header = header;
        return temp( 'footer', {} );
    } ).then( footer => {
        _footer = footer;

        temp( _path, _data );
    } ).catch( err => {
        debugger;
    } );
};

module.exports = template;