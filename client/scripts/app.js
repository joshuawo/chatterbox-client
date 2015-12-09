// YOUR CODE HERE:

var message = {};
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
  roomname : '',
  messageMaker : function(){
    message = {
      username : document.URL.substr(document.URL.indexOf('username=')+9),
      text : unescapeHtml($('#submitText').val()),
      roomname : escapeHtml($("#roomName").val())
    };
    console.log(message.roomname);
    // unescapeHtml($("#roomName").val()) || 
    app.send(message);
    app.addMessage(message);

  },

  init : function(){  
    $('#submitPost').on('click',app.messageMaker);
    $('#submitRoom').on('click', app.addRoom);
    // $('#chats').on('click', app.addFriend);

    $('body').on('click', '.username', function(){
      var name = $(this).text();
      console.log(name)
      app.loadFriendChat(name);
    });

    $(".room").change(function () {
      var room = $('option:selected', $(this)).text();
      //console.log(room);
      app.loadRoomChat(room);
      roomname = room;
    });


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

  fetch : function(){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.loadAllChat(data.results);
        app.loadAllRooms();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
      
    });

  },

  addMessage: function(message){

  },

  addRoom: function(){
    app.messageMaker();
    app.fetch();
    app.clearMessages();
    // $("'."+unescapeHtml($('#roomName').val())+"'").show();
    // roomname = unescapeHtml($('#roomName').val());
  },

  addFriend : function(){

  },

  clearMessages : function(){
    $('.message').hide();
  },

  handleSubmit : function(){

  },

  loadAllChat : function(data){
    rooms = {};
    resultArray = data;
    for(var i = 0; i < resultArray.length; i++){
      rooms[unescapeHtml(resultArray[i].roomname)] = rooms[unescapeHtml(resultArray[i].roomname)] + 1 || 1; 
      if( unescapeHtml(resultArray[i].text) === 'undefined' || unescapeHtml(resultArray[i].username) === 'undefined' || unescapeHtml(resultArray[i].text) === '' || unescapeHtml(resultArray[i].username) === ''){
        continue;
      } else {
        $('#chats').append('<div class = "message row '+ unescapeHtml(resultArray[i].roomname) +' '+ unescapeHtml(resultArray[i].username) +'"><div class = "text col-md-12">' + unescapeHtml(resultArray[i].text) + '<p class = "username"><a href="#">'+ unescapeHtml(resultArray[i].username) +'</a></p></div></div>');
      }
    }
  },

  loadFriendChat : function(name){
    app.clearMessages();
    $("."+name).show();
  },

  loadRoomChat : function(room){
    app.clearMessages();
    $("."+room).show();
  },

  loadAllRooms: function(){
    $('.room').empty();
    for(var key in rooms){
      $('.room').append('<option>'+key+'</option>');
    }
  }


};


$(document).ready(function(){
  app.init();
  app.fetch();
});