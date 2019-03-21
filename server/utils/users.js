[{
  id: 'ehjfnw',
  name: 'Sahil',
  room: 'Blah Blah'
}]

//--------Performs All The Tasks Related To The User--------//
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    // var users = this.users.filter((user) => {
    //   return user.room === room;
    // }); ES6 implemented below.
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () { //method on a class.
//     return `${this.name} is ${this.age} years(s) old.`;
//   }
// }
//
// var me = new Person('Sahil', '21');
//
// var description = me.getUserDescription();
// console.log(description);
