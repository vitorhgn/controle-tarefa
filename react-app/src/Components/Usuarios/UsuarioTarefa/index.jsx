import React from "react";
import Nav from "../../Shared/Layout";
import "./style.css";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2' ;

class Usuario extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      usuario_tarefaList: [],
        formSearch: {
            searchInput: "",
        },
      }
    }

componentDidMount(){
    this.fetchUsersList();
}

onClickRemoveUser = (codigo) =>{
    Swal.fire({
        title: 'Você realmente deseja excluír essa tarefa do usuário?',
        showCancelButton: false,
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: 'Excluír'
    }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(codigo);
        }
      });
}
deleteUser = (codigo) =>{
    this.setState({isLoading:true});
    fetch(`http://localhost:3009/admin/user-task/delete/${codigo}`, {
        method: 'DELETE'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        Swal.fire({
            icon: 'success',
            title: 'Parabéns',
            text: data.message
        })
        this.fetchUsersList()
    });
}
onSubmitFormSearch = (event)=>{
    event.preventDefault();
    this.fetchUsersList(event.target.searchInput.value);
}

fetchUsersList = (searchQuery = '') => {
    
    fetch(`http://localhost:3009/admin/user-task/list/${searchQuery}`).then((response) => {
        return response.json();
    })
    .then((data) =>{
        this.setState({usuario_tarefaList: data, TarefasList: data});

    })
    .catch((error)=>{
        Swal.fire({
            icon: 'error',
            Title: 'Erro',
            text: 'Desculpe, mas não foi possível estabelecer conexão com o servidor.'
        })
        console.log(error);
    })
}

  render() {
    return(
      <>
      <Nav />
      <section className="container">
        <header className="main-header">Tarefas dos Usuários</header>
        <div className="content">
          <div>
            <h5 className="taks-list">Lista dos usuários com suas tarefas</h5>
            <div className="search-tarefas">
              <div></div>
              <Link className="btn btn-warning" to="/adicionar-tarefas">
                Adicionar tarefa
              </Link>
            </div>
          </div>
          <div>
            <table id="tarefasList" className="table-list">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID do Usuário</th>
                  <th>ID da Tarefa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
              {
                    this.state.usuario_tarefaList.map((usuario_tarefa) =>{
                        return(
                            <tr key={usuario_tarefa.codigo}>
                    <td>{usuario_tarefa.codigo}</td>
                    <td>{usuario_tarefa.cod_usuario}</td>
                    <td>{usuario_tarefa.cod_tarefa}</td>
                    <td>
                    <button className="removeTarefa action-link" onClick={()=>{this.onClickRemoveUser(usuario_tarefa.codigo)}}>Excluir</button>
                    </td>
                    </tr>
                );
            })
        }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
    )
  };
}
export default Usuario;
