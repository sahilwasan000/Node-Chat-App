
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

 socket.on('newLocationMessage', function (message) {
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank">My Current Location</a>');

   li.text(`${message.from}`);
   a.attr('href', message.url);
   li.append(a);
   jQuery('#messages').append(li);

 });

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from:'User',
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
