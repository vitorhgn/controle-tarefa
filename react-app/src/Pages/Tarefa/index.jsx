import React from "react";
import Nav from "../../Components/Nav";
import "./style.css";
import Swal from 'sweetalert2' ;
import SupervisorButton from "../../Components/SupervisorButton";

class Tarefa extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        TarefasList: [],
        formSearch: {
            searchInput: "",
        }
    }
}

componentDidMount(){
    this.fetchTarefasList();
}

onClickRemoveTarefa = (codigo) =>{
    Swal.fire({
        title: 'Você realmente deseja excluír essa tarefa?',
        showCancelButton: false,
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: 'Excluír'
    }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTarefa(codigo);
        }
      });
}
deleteTarefa = (codigo) =>{
    this.setState({isLoading:true});
    fetch(`http://localhost:3009/admin/tarefa/delete/${codigo}`, {
        method: 'DELETE'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        Swal.fire({
            icon: 'success',
            title: 'Parabéns',
            text: data.message
        })
        this.fetchTarefasList()
    });
}
onSubmitFormSearch = (event)=>{
    event.preventDefault();
    this.fetchTarefasList(event.target.searchInput.value);
}

fetchTarefasList = (searchQuery = '') => {
    
    fetch(`http://localhost:3009/admin/tarefa/list/${searchQuery}`).then((response) => {
        return response.json();
    })
    .then((data) =>{
        this.setState({TarefasList: data});

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
    <Nav/>
        <section className="container">
          <header className="main-header">Tarefas</header>
          <div className="content">
            <div>
              <h5>Tarefas</h5>
              <div className="search-tarefas">
                <div>
                <form onSubmit={this.onSubmitFormSearch} id="formSearchTarefa" className="form-search" action="">
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
                  to={'/cadastro-tarefas'}
                  label={'Cadastrar Tarefas'}
                />
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
                {
                    this.state.TarefasList.map((tarefa) =>{
                        return(
                            <tr key={tarefa.codigo}>
                    <td>{tarefa.codigo}</td>
                    <td>{tarefa.nome}</td>
                    <td>{tarefa.tipo}</td>
                    <td>
                    <SupervisorButton className="removeTarefa action-link" onClick={()=>{this.onClickRemoveTarefa(tarefa.codigo)}} label="Excluir"></SupervisorButton>
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

export default Tarefa;