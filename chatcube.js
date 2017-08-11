var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000); 
var connections = [];
var users =[];
//app.use(express.static("./public"));
app.get("/", function(req,res){
 	res.sendFile(__dirname + '/public/index.html');
 });

console.log("Server running...on port 3000");

io.sockets.on('connect', function(socket){
    socket.emit("message","Welcome to Chat Cube");
    connections.push(socket);
    console.log('No. of users connected %s connections.length', connections.length);
});

io.sockets.on('disconnect',function(socket){
    connections.splice(connections.indexOf(socket),1);
    console.log('No. of users still connected %s connections.length', connections.length);
});

