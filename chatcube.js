var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

var connections = [];
var users =[];
app.use(express.static("./public"));
// app.get("/", function(req,res){
//  	res.sendFile(__dirname + '/public/index.html');

//  });

console.log("Server running...on port 3000");

io.sockets.on('connect', function(socket){
	socket.on("message", function(message) {
    	socket.broadcast.emit("message", message);
    });
    //socket.emit("message","You are in chatcube");
    connections.push(socket);
     console.log('No. of users connected %s', connections.length);
});

io.sockets.on('disconnect',function(socket){
    connections.splice(connections.indexOf(socket),1);
     console.log('No. of users still connected %s', connections.length);
});

