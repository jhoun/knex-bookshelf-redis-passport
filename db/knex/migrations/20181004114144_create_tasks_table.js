exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.boolean('is_complete').defaultTo(false);
    table
      .integer('user_id')
      .references('user_id')
      .inTable('users')
      .onDelete('cascade');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
