const bookshelf = require('./bookshelf.js');

const Tasks = bookshelf.Model.extend({
  tableName: 'tasks',
  idAttribute: 'task_id',
  hasTimestamps: true
});

module.exports = Tasks;
