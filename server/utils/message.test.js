
var expect = require('expect');
var {generateMessage} = require('./message.js');

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
