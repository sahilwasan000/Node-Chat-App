const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {

  var users;

  beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1.0',
    name: 'Mike',
    room: 'Room A'
  }, {
    id: '2.0',
    name: 'Harvey',
    room: 'Room B'
  }, {
    id: '3.0',
    name: 'Rachel',
    room: 'Room A'
  }];
});

  it('should add the user.' , () => {
    var users = new Users();
    var user = {
      id: 'ehjfnw',
      name: 'Sahil',
      room: 'Blah Blah'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should have names for Room A', () =>  {
    var userList = users.getUserList('Room A');

    expect(userList).toEqual(['Mike', 'Rachel']);

 });

  it('should have names for Room B', () => {
    var userList = users.getUserList('Room B');

    expect(userList).toEqual(['Harvey']);
});

  it('should return the user', () => {
    var userId = '2.0';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not return the user', () => {
    var userId = '2.1';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should remove the user', () => {
    var userId = '2.0';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove the user', () => {
    var userId = '2.1';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

});
