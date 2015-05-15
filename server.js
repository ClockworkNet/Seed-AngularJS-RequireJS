var express = require('express'),
	app = express();

app.use('', express.static('demo/'));
app.use('/src', express.static('src/'));

var server = app.listen('3000', function () {
});