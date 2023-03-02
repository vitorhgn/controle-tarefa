import React from "react";
import "./style.css";
import Nav from "../../Shared/Layout";

export default function CadastroTarefa() {

  return (
    <>
      <Nav />
      <section className="container">
        <header className="main-header">Cadastro de Tarefas</header>
        <div className="content">
          <form
            id="tarefaForm"
            className="form"
            method="post">
            <div className="form-group1">
              <label htmlFor="name">Nome da Tarefa</label>
              <input
                required
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="form-group1">
              <label htmlFor="situacao">Função</label>
              <select id="situacao" name="situacao">
                <option value="Diaria">Diaria</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
              </select>
            </div>
            <div className="actions">
              <a href="/tarefas" className="btn btn-warning margin-right-10">
                Cancelar
              </a>
              <button className="btn">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
