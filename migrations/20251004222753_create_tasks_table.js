
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary(); 
    table.string('title').notNullable();
    table.boolean('completed').defaultTo(false); 
    table.timestamps(true,true);
  });
};

exports.down = function(knex) {
  // O que fazer para reverter (deletar a tabela)
  return knex.schema.dropTable('tasks');
};
