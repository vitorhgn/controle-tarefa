/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("usuario", (t) => {
        t.increments("codigo");
        t.string("nome", 50).notNull();
        t.string("direito", 1).notNull();
        t.string("senha", 12).notNull();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};