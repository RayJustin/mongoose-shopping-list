var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var Item = require('./models/item');
var config = require('./config');

var app = express();

// I know what body parser does, but how do we know when to use it?
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

// Express GET handler
app.get('/items', function(req, res){
	Item.find(function(err, items){
		if(err){
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}
		res.json(items);
	});
});

// Express POST handler
app.post('/items', function(req, res){
	Item.create({name: req.body.name}, 
		function(err, item) {
			if(err){
				return res.status(500).json({
					message: 'Internal Server Error'
				});
			}
			res.status(201).json(item);
	});
});

// Express PUT handler
app.put('/items/:id', function(req, res){
	Item.findOneAndUpdate({_id: req.body.id},
		{$set: {name: req.body.name}}, {new: true},
		function(err, item){
			if(err){
				return res.status(500).json({
					message: 'Internal Server Error'
				});
			}
		res.status(200).json(item);
	});
});

// Express DELETE handler
app.delete('/items/:id', function(req, res){
	Item.findOneAndRemove({_id: req.params.id}, {remove: true},
		function(err, item){
			if(err){
				console.log(err);
				return res.status(500).json({
					message: 'Internal Server Error'
				});
			}
		res.status(200).json(item);
	});
});

// What exactly does this do? and whats with the *?
app.use('*', function(req, res){
	res.status(404).json({
		message: 'Not Found'
	});
});



