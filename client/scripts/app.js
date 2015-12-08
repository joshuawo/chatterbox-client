// YOUR CODE HERE:

var message = {};

var app = {
  server : 'https://api.parse.com/1/classes/chatterbox',
  messageMaker : function(){
    message = {
      username : document.URL.substr(document.URL.indexOf('username=')+9),
      text : $('#submitText').val(),
      roomname : $("#roomName").val() || ''
    };

    app.send(message);
    app.addMessage(message);

  },

  init : function(){  
    $('#submitPost').on('click',app.messageMaker);
    $('#submitRoom').on('click', app.addRoom);
    $('#main').on('click', app.addFriend);
    $('#send .submit').on('submit', app.handleSubmit);
  },
  send : function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  addMessage: function(message){
    $('#chats').append('<div class = "message"><div class = "text">' + message.text + '</div><div class = "username"> '+ message.username +'</div></div>');

  },

  addRoom: function(){
    $('#roomSelect').append('<div>' + $("#roomName").val() + '</div>');
  },

  addFriend : function(){
  },

  clearMessages : function(){
    $('#chats').empty();
  },

  handleSubmit : function(){

  },

  fetch : function(){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET'
      
    });

  }

};

$(document).ready(function(){
  app.init();
});
