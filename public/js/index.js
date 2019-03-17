
var socket = io(); //not native to browser. Initiating req to open a web socket from client side and keep it open.

socket.on('connect', function ()  { //for the client side.
  console.log('connnected to the server.');
 });

 socket.on('disconnect', function ()  {
     console.log('Disconnnected from the server.');
 });

 socket.on('newMessage', function (message) {
   console.log('New Message', message);
 });

socket.emit('createMessage', {
    from: 'Harvey',
    text: 'Hey Mike!'
  }, function () {
    console.log('Got it.');
  });
