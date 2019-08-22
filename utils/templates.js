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

            if ( _path === 'homepage' && _data[ 'arr' ] ) {
                const _headers = _data[ 'arr' ].shift().split( ';' ); 

                let output = '';

                const _promiseOutput = new Promise( ( resolve, reject ) => {
                    temp( 'library/bookth', {
                        title: _headers[ 0 ].toUpperCase(),
                        author: _headers[ 1 ].toUpperCase(),
                        issuedon: _headers[ 2 ].toUpperCase()
                    } ).then( book => {
                        output += book;

                        return temp( 'homepage', { one: 'one' } );
                    } ).then( homepage => {
                        let arrBookLines = _data[ 'arr' ];
                        const arrBooks = arrBookLines.map( bookLine => { 
                            return getObject( _headers, bookLine ); 
                        } );

                        arrBooks.sort( ( a, b ) => {
                            if ( _data[ 'sort' ] === 'author' ) {
                                return a['author']
                                    .toString()
                                    .localeCompare( b[ 'author' ].toString() )
                            } else if ( _data[ 'sort' ] === 'issuedon' ) {
                                return a['issuedon']
                                    .toString()
                                    .localeCompare( b[ 'issuedon' ].toString() ) 
                            } else {
                                return a['title']
                                    .toString()
                                    .localeCompare( b[ 'title' ].toString() ) 
                            }
                        } );

                        arrBooks.forEach( ( _bookObj, _i )=> {
                            temp( 'library/booktd', _bookObj ).then( _book => {
                                output += _book;

                                if ( 
                                    _i 
                                    === ( _data[ 'arr' ].length - 1 ) 
                                ) {
                                    output 
                                        = `${homepage}<table class="books-table">${output}</table>`;
                                    resolve( output );
                                }
                            } );
                        }); 
                    } );

                    function getObject ( _headers, line ) {
                        const arr = line.split( ';' );

                        const obj = {};
                        for ( const i in _headers ) {
                            obj[ _headers[ i ] ] = arr[i];
                        }

                        return obj;
                    } 
                } );

                return _promiseOutput; 
            }

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