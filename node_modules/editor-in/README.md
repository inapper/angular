# Editor In

> Opens an editor, gets the result after the process has exited

__Install:__

```
npm install editor-in
```

__Usage:__

```javascript
var editorIn = require('editor-in');

// Opens process.env.EDITOR
editorIn( function( error, result ){
  // result is a Buffer
  console.log( result.toString() );
});
```

![Editor In](http://storage.j0.hn/editor-in.gif)

## API

This module exports a single function

### editorIn( [options], callback )

Opens a temporary file in `options.editor` or `process.env.EDITOR` and returns the result.

__Options:__

```javascript
// Options and defaults
{
  // Editor to use Ex: 'vim'
  editor:         process.env.EDITOR || 'vi'
  // Initial content for the editor
, content:        ''
  // Prefix of tmp filename Ex: 'some-file-'
, tmpFilePrefix:  ''
  // Suffix of tmp filename Ex: '.md'
, tmpFilePostfix: ''
}
```