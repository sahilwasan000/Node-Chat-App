
var socket = io(); //not native to browser. Initiating req to open a web socket from client side and keep it open.

socket.on('connect', function ()  { //for the client side.
  console.log('connnected to the server.');
 });

 socket.on('disconnect', function ()  {
     console.log('Disconnnected from the server.');
 });

 socket.on('newMessage', function (message) {
   console.log('New Message', message);

   var li = jQuery('<li></li>');
   li.text(`${message.from}: ${message.text}`);

   jQuery('#messages').append(li);
 });

// socket.emit('createMessage', {
//     from: 'Harvey',
//     text: 'Hey Mike!'
//   }, function () {
//     console.log('Got it.');
//   });

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
      from:'User',
      text: jQuery('[name=message]').val()
    }, function () {

    });
  });
