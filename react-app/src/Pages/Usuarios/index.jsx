import React from "react";
import Nav from "../../Components/Nav";
import "./style.css";
import Swal from 'sweetalert2' ;
import SupervisorButton from "../../Components/SupervisorButton";

class Usuario extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      usuariosList: [],
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
        title: 'Você realmente deseja excluír esse usuário?',
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
    fetch(`http://localhost:3009/admin/user/delete/${codigo}`, {
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
    
    fetch(`http://localhost:3009/admin/user/list/${searchQuery}`).then((response) => {
        return response.json();
    })
    .then((data) =>{
        this.setState({usuariosList: data, TarefasList: data});

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
        <header className="main-header">Usuários</header>
        <div className="content">
          <div>
            <h5>Usuários</h5>
            <div className="search-tarefas">
              <div>
              <form onSubmit={this.onSubmitFormSearch} id="formSearchUsers" className="form-search" action="">
                    <input type="text" name="searchInput" id="searchInput" value={this.state.formSearch.searchInput} onChange={(event)=>{
                    this.setState({
                        formSearch: {
                            searchInput: event.target.value
                        }
                    })
                    }}/>
                    <button>Pesquisar</button>
                </form>
              </div>
              <SupervisorButton
                className={'btn-dark'}
                to={'/cadastro-users'}
                label={'Cadastrar Usuários'}
              />
            </div>
          </div>
          <div>
            <table id="tarefasList" className="table-list">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Usuário</th>
                  <th>Cargo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
              {
                    this.state.usuariosList.map((usuario) =>{
                        return(
                            <tr key={usuario.codigo}>
                    <td>{usuario.codigo}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.direito}</td>
                    <td>
                    <SupervisorButton className="removeTarefa action-link" onClick={()=>{this.onClickRemoveUser(usuario.codigo)}} label="Excluir"/>
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
