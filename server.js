var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

// Why do we use bodyparser.json? What does that do?
app.use(bodyparser.json());
app.use(express.static('public'));

// Why do we do err && callback
var runServer = function(callback) {
	mongoose.connect(config.DATABASE_URL, function(err){
		if(err && callback) {
			return callback(err);
		}
		app.listen(config.PORT, function(){
			console.log('Listening on port:' + config.PORT);
			if(callback) {
				callback();
			}
		});
	});
};

// I know what this does but what is require.main? I wanna understand
if(require.main === module) {
	runServer(function(err){
		if(err) {
			console.error(err);
		}
	});
};

exports.app = app;
exports.runServer = runServer;