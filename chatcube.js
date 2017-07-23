var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

app.use(express.static("./public"));

io.on("connection",function(socket){
    
    console.log("fucntion called");
    socket.on("chat", function(message) {
    	socket.broadcast.emit("message", message);
    });
    
    console.log("fucntion called 2 times");
  
    socket.emit("message","Welcome to Chat Cube");

});

console.log("Starting Socket App - http://localhost:3000");