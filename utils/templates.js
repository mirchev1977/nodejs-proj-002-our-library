const fs = require( 'fs' );


const replaceAll = ( fileString, _data ) => {
    Object.keys( _data ).forEach( ( _key ) => {
        fileString = fileString.replace(
            new RegExp( `{{${_key}}}`, 'g' ), _data[ _key ] 
        );
    } );

    return fileString;
}

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
                resolve( replaceAll( fileString, _data ) );
            }
        } ); 
    } );

    return promise;
};

const template = ( _path, _data ) => {
    const promise = new Promise( ( resolve, reject ) => {
        let _header;
        let _footer;
        temp( 'header', {} ).then( header => {
            return header;
        } ).then( header => {
            _header = header;
            return temp( 'footer', {} );
        } ).then( footer => {
            _footer = footer;
            return temp( _path, _data );
        } ).then( body => {
            resolve( `${_header}${body}${_footer}` );
        } ).catch( err => {
            debugger;
        } ); 
    } );

    return promise;
};

module.exports = template;