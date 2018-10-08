const CONFIG = require('./config').KNEX;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: CONFIG.USER_NAME,
      password: CONFIG.PASSWORD,
      database: CONFIG.DATABASE,
      charset: 'utf8'
    }
  },

  migrations: {
    directory: __dirname + '/knex/migrations'
  },
  seeds: {
    directory: __dirname + 'knex/seeds'
  }
};
