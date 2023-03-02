/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('usuario').del()
    await knex('usuario').insert([
      {nome: 'Supervisor',direito: 'S', senha:'123456'},
      {nome: 'Operador',direito: 'O', senha:'123456'},
    ]);
  };