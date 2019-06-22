var fs      = require('fs');
var child   = require('child_process');
var tmp     = require('tmp');

module.exports = function( options, callback ){
  var defaults = {
    tmpFilePrefix:    ''
  , tmpFilePostfix:   ''
  , editor:           'vi'
  , content:          ''
  };

  if ( typeof options === 'function' ){
    callback = options;
    options = null;
  }

  options = options || {};

  for ( var key in defaults ){
    if ( !(key in options) ) options[ key ] = defaults[ key ];
  }

  if ( !options.editor && !process.env.EDITOR ){
    throw new Error('Missing required option: `editor`');
  }

  var toptions = {
    prefix: options.tmpFilePrefix
  , postfix: options.tmpFilePostfix
  };

  tmp.file( toptions, function( error, fpath ){
    if ( error ) return callback( error );

    // Write initial content
    (function( next ){
      if ( !options.content ) return next();

      fs.writeFile( fpath, options.content, function( error ){
        if ( error ) return callback( error );

        next();
      });
    })( function(){
      var editor = child.spawn(
        options.editor || process.env.EDITOR
      , [ fpath ]
      , { stdio: 'inherit' }
      );

      editor.on( 'exit', function( code ){
        if ( code > 0 ) return callback( null, new Buffer() );

        fs.readFile( fpath, function( error, result ){
          if ( error ) return callback( error );

          // Result always has a trailing '\n'
          // if ( result.length > 0 ){
          //   result.length = result.length - 1;
          // }

          return callback( null, result );
        });
      });
    });
  });
};