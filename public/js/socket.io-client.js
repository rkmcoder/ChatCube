var socket = io();
var $chat;
var $loggedInArea;
var $loginArea;
var $msgForm;
var $loginForm;
var $users;
var $username;
var $password;
var $msgTextArea;
var $signUpArea;
var $signUpForm;

socket.on("disconnect", function() {
    setTitle("Disconnected");
});

socket.on("connect", function() {
    setTitle("Welcome to Chat Cube");
    $chat = $('#chat');
    
    $loggedInArea = $('#loggedInArea');
    $loginArea = $('#loginArea');
    $signUpArea = $('#signUpArea');
    $msgTextArea = $('#msgTextArea');

    $msgForm = $('#msgForm');
    $loginForm = $('#loginForm');
    $signUpForm = $('#signUpForm');

    $users = $('#users');
    $username = $('#username');
    $password = $('#password');

    $fullname = $('#fullname');

    loginForm.onsubmit = function() {
       if($username.val()!='' && $password.val() == '123'){
            socket.emit('new user',$username.val());
            $loggedInArea.show();
            $loginArea.hide();
        }
            else
                alert("Enter a Username and password 123!");
        $password.val('');
    };

    document.getElementById('signUp0').onclick = function() {
            $loginArea.hide();
            $loggedInArea.hide();
            $signUpArea.show();
    };

    signUpForm.onsubmit = function() {
            socket.emit('new user',$fullname.val());
            $loggedInArea.show();
            $loginArea.hide();
            $signUpArea.hide();
    };


    msgForm.onsubmit = function(){
        socket.emit('chat', $msgTextArea.val());
        $msgTextArea.val('');
        };



});

socket.on("new message", function(data) {
    printMessage(data);
});

socket.on('get users',function(data){
    var html ='';
    for(i=0; i<data.length; i++){
        html += '<li class="list-group-item">'+ data[i] + '</li>'
    }
    $users.html(html);

});

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(data) {
   
    $chat.append('<div class="well well-sm">' + '<strong>' + data.name + '</strong>' + ':' + data.msg + '</div>');
}