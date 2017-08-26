var socket = io();
var $chat;
var $loggedInArea;
var $loginArea;
var $msgForm;
var $loginForm;
var $users;
var $username;
var $username1;
var $password;
var $password1;
var $msgTextArea;
var $signUpArea;
var $signUpForm;
var $emailphone;
var $loginInvalid;
var $userExists;
var $login0;

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

    $username1 = $('#username1');
    $password1 = $('#password1');
    $emailphone = $('#emailphone');

    $loginInvalid = $('#loginInvalid');
    $userExists = $('#userExists');

    $login0 = $('#login0');
    $signUp0 = $('#signUp0');

    loginForm.onsubmit = function() {
        var loginDetails = {  
        username : $username.val(),
        password : $password.val()
        }; 
            
        socket.emit('login new user',loginDetails);
        socket.on('login credentials',function(loginCredentials){
            if(loginCredentials == "Correct"){
                $loggedInArea.show();
                $loginArea.hide();
            }
            else if(loginCredentials == "Incorrect"){
                $loginInvalid.show();
                $password.val('');
            }
            
        });
        
    };

    signUp0.onclick = function() {
            $loginArea.hide();
            $loggedInArea.hide();
            $signUpArea.show();
            $userExists.hide();
    };

    login0.onclick = function() {
            $loginArea.show();
            $loggedInArea.hide();
            $signUpArea.hide();
            $loginInvalid.hide();
    };

    signUpForm.onsubmit = function() {
        var loginDetails = {  
            username : $username1.val(),
            password : $password1.val(),
            emailphone : $emailphone.val()
        };         
        socket.emit('signup new user',loginDetails);
        socket.on('signup credentials',function(signUpCredentials){
            if(signUpCredentials == "Correct"){
                 $loggedInArea.show();
                 $loginArea.hide();
                 $signUpArea.hide();
            }
            else if(signUpCredentials == "Incorrect"){
                $login0.show();
                $userExists.show();
                $password1.val('');
            }

        });
       
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