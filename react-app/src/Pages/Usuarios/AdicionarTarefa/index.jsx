import React, { useEffect } from "react";
import "./style.css";
import Nav from "../../../Components/Nav";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import handleStorage from '../../../storage/storage';

export default function CadastroUsuario() {
  const [isRedirect, setIsRedirect] = useState(false);
  
  const [cod_usuario, updateCod_usuario] = useState("");
  const [cod_tarefa, updateCod_tarefa] = useState("");
  
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  const fetchUsersAndTasksAvailable = () => {
    
    fetch(`http://localhost:3009/admin/user-task/tasks-and-users-available`).then((response) => {
      return response.json();
    })
    .then((data) =>{
      setUsers(data.users)
      setTasks(data.tasksAvailable);
      
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
    
    const onSubmitForm = (event) => {
      event.preventDefault();
      const body = {
        cod_usuario,
      cod_tarefa,
    };
    
    let methodEndPoint;
    let urlEndPoint;
    
    methodEndPoint = "POST";
    urlEndPoint = "http://localhost:3009/admin/user-task/create";
    
    console.log(urlEndPoint, methodEndPoint);
    fetch(urlEndPoint, {
      method: methodEndPoint,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
    .then((response) => {
      return response.json();
    })
      .then((data) => {
        if (data.result) {
          Swal.fire({
            icon: "success",
            title: "Parabéns",
            text: data.message,
          });
          setIsRedirect(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Desculpe ...",
            text: data.message,
          });
        }
      });
    };
    
    useEffect(()=>{
      fetchUsersAndTasksAvailable();
    })
    const storage = handleStorage();
    if(!storage.isSupervisor()){
    return <Navigate to="/"/>;
  }

  if (isRedirect) {
    return <Navigate to="/users-tarefas" />;
  }

  return (
    <>
      <Nav />
      <section className="container">
        <header className="main-header">Adicionar tarefas à um usuário</header>
        <div className="content">
          <form
            id="usersForm"
            className="form"
            method="post"
            onSubmit={onSubmitForm}
          >
            <div className="form-group1">
              <label htmlFor="name">Usuário</label>
              <select required name="idUser" id="idUser"  onChange={(event) => {
                  updateCod_usuario(event.target.value);
                }}>
                <option value=''>Selecione um usuário</option>
                {users.map((item)=>
                  <option key={item.codigo} value={item.codigo}>{item.nome}</option>
                )}
              </select>
              
            </div>
            <div className="form-group1">
              <label htmlFor="name">Tarefa</label>
              <select required name="idTask" id="idTask"  onChange={(event) => {
                  updateCod_tarefa(event.target.value);
                }}>
                <option value=''>Selecione uma tarefa</option>
                {tasks.map((item)=>
                  <option key={item.codigo} value={item.codigo}>{item.nome}</option>
                )}
              </select>
            </div>
            <div className="actions">
              <Link to="/users-tarefas" className="btn btn-warning margin-right-10">
                Cancelar
              </Link>
              <button className="btn">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
