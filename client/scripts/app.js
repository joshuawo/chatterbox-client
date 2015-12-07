// YOUR CODE HERE:

var app = {
  messageMaker : function(){
    message = {
      username : document.URL.substr(document.URL.indexOf('username=')+9),
      text : $('#submitText').val(),
      roomname : 'lobby'
    };

    app.send(message);

  },

  init : function(){  
    $('#submitPost').on('click',app.messageMaker);
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

};

$(document).ready(function(){
  app.init();
});
