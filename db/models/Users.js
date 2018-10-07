const bookshelf = require('./bookshelf.js');
// const Tasks = require('./Tasks.js');

const Users = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'user_id',
  hasTimestamps: true
  // posts: () => {
  //   return this.hasMany(Tasks);
  // }
});

module.exports = Users;
