/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("usuario_tarefa", (t) => {
        
        t.increments("codigo");

        t.integer('cod_usuario').unsigned()
        t.foreign('cod_usuario').references('usuario.codigo');

        t.integer('cod_tarefa').unsigned()
        t.foreign('cod_tarefa').references('tarefa.codigo');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};