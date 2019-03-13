var socket = io(); //not native to browser. Initiating req to open a web socket from client side and keep it open.

socket.on('connect', function ()  { //for the client side.
  console.log('connnected to the server.');

  socket.emit('createEmail', {
    to: 'sahil@yahoo.com',
    text: 'blah blah blah'
  });
});

socket.on('disconnect', function ()  {
    console.log('Disconnnected from the server.');
});

socket.on('newEmail', function (email) {
  console.log('New Email', email);
})