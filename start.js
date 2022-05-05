require('babel-register')({
    presets: [ 'env' ]
});
require('babel-polyfill');
require('./app.js');
// babel-preset-env babel-polyfill babel-register