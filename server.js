/* Serves the site, Run this file to start up the server */

var express = require('express');
var app = express();

app.use('', express.static('HTML'));
app.use('/site-format', express.static('site-format.json'))

/* Start the server */
console.log('Server started')
app.listen(3000);
