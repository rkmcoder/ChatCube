var socket = io();
var newChat;

socket.on("disconnect", function() {
    setTitle("Disconnected");
});

socket.on("connect", function() {
    setTitle("Welcome to Chat Cube");
     //document.querySelector("div.chat");
    newChat = $('#chat');
});

socket.on("message", function(message) {
    printMessage(message);
});



function SumbitFunc () {
    var input = document.getElementById("message");
    printMessage(input.value);
    socket.emit("chat", input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement("p");
    p.innerText = message;
    newChat.append('<div class="well">' + message + '</div>');
}