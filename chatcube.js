var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
var mongo = require("mongodb").MongoClient;

var connections = [];
var users =[];

app.use(express.static("./public"));

console.log("Server running...on port 3000");
mongo.connect("mongodb://localhost:27017/chatcube",function(err,db){
	if(err)
		throw err;
	console.log("Connected to Mongodb");
	var userscollection = db.collection('users');

		io.sockets.on('connect', function(socket){
		userscollection.find().toArray(function(err,result){
			if(err)
				throw err;
			console.log(result);
		});
		connections.push(socket);
		console.log('No. of users connected %s', connections.length);

		socket.on('disconnect',function(){
			users.splice(users.indexOf(socket.username),1);
			updateUsers();
		    connections.splice(connections.indexOf(socket),1);
		    console.log('No. of users still connected %s', connections.length);
		});

		socket.on('chat', function(data) {
		    	io.sockets.emit("new message", {msg:data,name:socket.username});
		    });

		socket.on('new user', function(data) {
			socket.username = data;
			users.push(socket.username);
			updateUsers();
		    });

		socket.on('signup new user',function(data){
			userscollection.insert({"username":data.username, "password":data.password , "emailphone" : data.emailphone});
			socket.username = data.username;
			users.push(socket.username);
			updateUsers();

		});

		function updateUsers(){
			io.sockets.emit('get users',users);
		}

		});
	//db.close();
});



