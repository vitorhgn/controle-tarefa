/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tarefa').del()
  await knex('tarefa').insert([
    {nome: 'Entregar relatório',tipo: 'S'},
    {nome: 'Codar',tipo: 'D'},
    {nome: 'Entregar projeto',tipo: 'M'},
  ]);
};
