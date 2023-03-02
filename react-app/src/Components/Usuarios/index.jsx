import React from "react";
import Nav from "../Shared/Layout";
import "./style.css";

class Usuario extends React.Component {
  componentDidMount(){
  }



  render() {
    return(
      <>
      <Nav />
      <section className="container">
        <header className="main-header">Usuários</header>
        <div className="content">
          <div>
            <h5>Usuários</h5>
            <div className="search-tarefas">
              <div>
                <input id="id" type="text" />
                <input type="submit" value="Pesquisar" />
              </div>
              <a className="btn btn-dark" href="/cadastro-users">
                Cadastrar Usuários
              </a>
            </div>
          </div>
          <div>
            <table id="tarefasList" className="table-list">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Usuário</th>
                  <th>Nome da Tarefa</th>
                  <th>Tipo Tarefa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    </>
    )
  };
}
export default Usuario;
