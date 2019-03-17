
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message', () => {
    var from = 'Jenny';
    var text = 'Some extraordinary message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from: from, //({form, text})
      text: text
      });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Laura';
    var latitude = 55;
    var longitude = -59;
    var url = 'https://www.google.com/maps?q=55,-59';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
