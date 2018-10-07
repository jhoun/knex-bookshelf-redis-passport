exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_id: 1,
          title: 'Buy Dinner',
          description: 'Go to McDonalds',
          is_complete: true,
          user_id: 1
        }
      ]);
    });
};
