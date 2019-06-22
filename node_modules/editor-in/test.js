var editorIn = require('./');

editorIn({
  editor: process.argv[2] || 'vim'
, content: '# This is the content'
, tmpFilePrefix: 'poop'
, tmpFilePostfix: '.markdown'
}, function( error, result ){
  console.log( result.toString() );
});
