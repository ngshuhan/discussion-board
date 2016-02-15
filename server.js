var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.json());



app.use(express.static(path.join(__dirname,'./client')));

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app);







var server = app.listen(8000,function() {
	console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket) {
	console.log('SERVER:: WE ARE USING SOCKETS!!');

	socket.on('newTopic',function(data) {
		console.log("I got the topic...");

		socket.broadcast.emit('updateTopic',data);

	})

	socket.on('newPost',function(data) {
		// console.log(data);
		socket.broadcast.emit('updatePost',data);
	})





})