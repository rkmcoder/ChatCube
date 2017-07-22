var express = require("express");
var http = require("http");
var app = express();
var port = 3000;
var server = http.createServer(app).listen(port);

var io = require("socket.io")(server);

app.use(express.static("./public"));

io.on("connection",function(socket){
    
    socket.emit("message","Welcome to Chat Cube")

    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });

});

console.log("Starting Socket App - http://localhost:3000");