import React from "react";
import Nav from "../Shared/Layout";
import "./style.css";

export default function Tarefa() {
  return (
    <>
<Nav/>
    <section className="container">
      <header className="main-header">Tarefas</header>
      <div className="content">
        <div>
          <h5>Tarefas</h5>
          <div className="search-tarefas">
            <div>
              <input id="id" type="text" />
              <input type="submit" value="Pesquisar" />
            </div>
            <a className="btn btn-dark" href="/cadastro-tarefas">Cadastrar Tarefas</a>
          </div>
        </div>
        <div>
          <h5>Situação</h5>
          <div className="buscar-tarefas">
            <select id="situacao" name="situacao">
              <option value="Diaria">Diária</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensal">Mensal</option>
            </select>
            <input type="submit" value="Buscar" />
          </div>
        </div>
        <div>
          <table id="tarefasList" className="table-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Tarefa</th>
                <th>Tipo Tarefa</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  );
}
