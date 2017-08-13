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

socket.on("disconnect", function() {
    setTitle("Disconnected");
});

socket.on("connect", function() {
    setTitle("Welcome to Chat Cube");
    $chat = $('#chat');
    $loggedInArea = $('#loggedInArea');
    $loginArea = $('#loginArea');
    $msgTextArea = $('#msgTextArea');
    $msgForm = $('#msgForm');
    $loginForm = $('#loginForm');
    $users = $('#users');
    $username = $('#username');
    $password = $('#password');

});

socket.on("new message", function(data) {
    printMessage(data);
});

socket.on('get users',function(data){
    var html ='';
    for(i=0; i<data.length; i++){
        html += '<li class="list-group-tems">'+ data[i] + '</li>'
    }
    $users.html(html);

});


function loginFunc(){
        
            //if($username.val() != '' && $password.val() == 'welcome'){
                 if(true){
                socket.emit('new user',$username.val());
                $loggedInArea.show();
                $loginArea.hide();
            }
            else
                alert("Wrong password!");
        
    $username.val('');
    $password.val('');
    
};

function submitFunc(){
    socket.emit('chat', $msgTextArea.val());
    $msgTextArea.val('');
    };

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(data) {
   
    $chat.append('<div class="well well-sm">' + '<strong>' + data.name + '</strong>' + ':' + data.msg + '</div>');
}