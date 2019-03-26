// console.log(__dirname + '/../public'); //older version

const path = require('path');
const publicPath = path.join(__dirname + '/public');
const port = process.env.PORT || 8080;
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./server/utils/message.js');

const express = require('express');
const app = express();
var server = http.createServer(app);// We were already using it behind the scenes.
var io = socketIO(server);//we get here our web sockets server. We will communicate through betweeen client and server.
const {Users} = require('./server/utils/users');
var users = new Users();

app.use(express.static(publicPath));
const {isRealString} = require('./server/utils/validation');

io.on('connection', (socket) => {//connection refers to a new connection being called.
  console.log('New User is connected.');//listen to an event and do something when that event happens. socket-> refers to individual socket.

  // socket.emit('newMessage', {//socket.emit emits only to a specific user.
  //   from: 'sahil@gmail.com',
  //   text: 'You feel we can meet yesterday?',
  //   completedAt: 523
  // });

//-------Validating Correct Values--------//
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));// emits message to every connected user.
    }
        callback();
    // socket.broadcast.emit('newMessage', {//broadcast sends message to all but one, here the user who origially send it.
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
    }
  });
});

server.listen(port, ()=> {
  console.log(`Server Up on ${port}`);
});
