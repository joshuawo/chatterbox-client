// YOUR CODE HERE:

var message = {};

var resultArray = [];

var rooms = {};

var escapeHtml = function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// UNSAFE with unsafe strings; only use on previously-escaped ones!
var unescapeHtml = function(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
};

var app = {
  server : 'https://api.parse.com/1/classes/chatterbox',
  messageMaker : function(){
    message = {
      username : document.URL.substr(document.URL.indexOf('username=')+9),
      text : escapeHtml($('#submitText').val()),
      roomname : escapeHtml($("#roomName").val()) || ''
    };

    console.log(message);
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
    debugger;
    app.messageMaker();
    app.fetch();
    $('#room').append('<option>'+ unescapeHtml($('#roomName').val()) +'</option>');
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
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        
        resultArray = data.results;
        for(var i = 0; i < resultArray.length; i++){
          if( unescapeHtml(resultArray[i].text) === 'undefined' || unescapeHtml(resultArray[i].username) === 'undefined' || unescapeHtml(resultArray[i].text) === '' || unescapeHtml(resultArray[i].username) === ''){
            continue;
          } else {
            $('#chats').append('<div class = "message row"><div class = "text col-md-1"></div><div class = "text col-md-6">' + unescapeHtml(resultArray[i].text) + '</div><div class = "username col-md-4"> '+ unescapeHtml(resultArray[i].username) +'</div><div class = "text col-md-1"></div></div>');
    
            rooms[unescapeHtml(resultArray[i].roomname)] = rooms[unescapeHtml(resultArray[i].roomname)] + 1 || 1; 
          }
        }

        for(var key in rooms){
          $('.room').append('<option>'+key+'</option>');
        }
        //console.log(resultArray);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
      
    });

  }

};

$(document).ready(function(){
  app.init();
  app.fetch();
});
