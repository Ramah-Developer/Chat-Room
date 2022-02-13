var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

OnloadAlert()


  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom: " + room;
  })

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length < 9){
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    else{
      messages.shift();
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#303030";
    }
  })
}

function Connect(){
  socket.emit("join", chatIDInput.value, usernameInput.value);
  Connected()
}

function Send(){
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
    SentMessage()
  }
}

function SentMessage(){
  alert('Succesfully sent message.')
}

function Connected(){
  alert('Success! You have connected to the chat.')
}

function OnloadAlert(){
  alert('Welcome to Socketio chat. This is in its stable stage, which means im not going to continue this project. Click Close or OK to continue. -indigiz')
}



function delayReset(){
  delay = true;
}

