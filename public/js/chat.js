
var socket = io(); //not native to browser. Initiating req to open a web socket from client side and keep it open.

//Function To enable Auto-Scrolling.
function scrollToBottom () {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  //heights
  var clientHeight = messages.prop('clientHeight'); //cross-browser alternative to fetch a property. -> prop
  var scrollHeight = messages.prop('scrollHeight');
  var scrolTop = messages.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); //second-last child

  if(clientHeight + scrolTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};


socket.on('connect', function ()  { //for the client side.
  // console.log('connnected to the server.');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    }

    else {
      console.log('Nooooooo errrr');
    }
  });
 });

 socket.on('disconnect', function ()  {
     console.log('Disconnnected from the server.');
 });

 socket.on('updateUserList', function (users) {
   var ol = jQuery('<ol></ol>');

   users.forEach(function (user) {
     ol.append(jQuery('<li></li>').text(user));
   });

   jQuery('#users').html(ol);
 });

 socket.on('newMessage', function (message) {
   // console.log('New Message', message);
   //
   // var li = jQuery('<li></li>');
   // var formattedTime = moment(message.createdAt).format('LT');
   // li.text(`${message.from} ${formattedTime} : ${message.text}`);
   //
   // jQuery('#messages').append(li);

   //-----------Mustache Code-------------//
   var formattedTime = moment(message.createdAt).format('LT');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
     text: message.text,
     from: message.from,
     createdAt: formattedTime
   });

   jQuery('#messages').append(html);
   scrollToBottom();
 });

 socket.on('newLocationMessage', function (message) {
   var formattedTime = moment(message.createdAt).format('LT');
   // var li = jQuery('<li></li>');
   // var a = jQuery('<a target="_blank">My Current Location</a>');
   //
   // li.text(`${message.from} ${formattedTime} : `);
   // a.attr('href', message.url);
   // li.append(a);
   // jQuery('#messages').append(li);

   //-----------Mustache Code-------------//
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template, {
     from: message.from,
     url: message.url,
     createdAt: formattedTime
   });

   jQuery('#messages').append(html);
   scrollToBottom();
 });

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
      text: messageTextBox.val()
    }, function () {
      messageTextBox.val('') //clear output after appending value to page.
    });
  });


  var locationButton = jQuery('#send-location');
  locationButton.on('click', function () {
    if(!navigator.geolocation){ //check for older browser.
    return alert('Browser not supported');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude, //fetch location using geolocation api.
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send Location');
    return alert('Unable to fetch your location.') //for asking permission to turn on/off location.
    });
  });
