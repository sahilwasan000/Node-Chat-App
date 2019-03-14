// console.log(__dirname + '/../public'); //older version

const path = require('path');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 8080;
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
const app = express();
var server = http.createServer(app);// We were already using it behind the scenes.
var io = socketIO(server);//we get here our web sockets server. We will communicate through betweeen client and server.

app.use(express.static(publicPath));

io.on('connection', (socket) => {//connection refers to a new connection being called.
  console.log('New User is connected.');//listen to an event and do something when that event happens. socket-> refers to individual socket.

  // socket.emit('newMessage', {//socket.emit emits only to a specific user.
  //   from: 'sahil@gmail.com',
  //   text: 'You feel we can meet yesterday?',
  //   completedAt: 523
  // });

  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });// emits message to every conneted user.
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected.');
    });
});

server.listen(8080, ()=> {
  console.log(`Server Up on ${port}`);
})
