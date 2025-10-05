// knexfile.js

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './todo.db' // O Knex criará este arquivo
    },
    useNullAsDefault: true, // Necessário para SQLite
  },
};