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

		socket.on('login new user', function(data) {
			userscollection.findOne({username:data.username.toLowerCase(),password:data.password},function(err,user){
				if(err){
					throw err;
				}
				
				if(user != null){
					socket.username = data.username;
					socket.password = data.password;
					socket.emit('login credentials',"Correct");
					users.push(socket.username);
					updateUsers();
				}
				else{
					socket.emit('login credentials',"Incorrect");
				}
			});
		});

		socket.on('signup new user',function(data){
			var email;
			var phone;
			if(isNaN(data.emailphone))
				email = data.emailphone;
			else
				phone = data.emailphone;

			userscollection.findOne({username:data.username.toLowerCase()},function(err,user){
				if(err) 
					throw err;
				if(user != null){
					socket.emit('signup credentials',"Incorrect");
				}
				else{
					socket.emit('signup credentials',"Correct");
					userscollection.insert({"username":data.username.toLowerCase(), "password":data.password , "email" : email, "phone":phone});
					socket.username = data.username;
					users.push(socket.username);
					updateUsers();
				}
			});
			

		});

		function updateUsers(){
			io.sockets.emit('get users',users);
		}

		});
	//db.close();
});



