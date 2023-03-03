import React from "react";
import "./style.css";
import Nav from "../../Shared/Layout";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CadastroUsuario() {
  const [isRedirect, setIsRedirect] = useState(false);

  const [cod_usuario, updateCod_usuario] = useState("");
  const [cod_tarefa, updateCod_tarefa] = useState("");

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

  if (isRedirect) {
    return <Navigate to="/users-tarefas" />;
  }

  return (
    <>
      <Nav />
      <section className="container">
        <header className="main-header">Adicionar Tarefas</header>
        <div className="content">
          <form
            id="usersForm"
            className="form"
            method="post"
            onSubmit={onSubmitForm}
          >
            <div className="form-group1">
              <label htmlFor="name">ID do Usuário</label>
              <input
                required
                type="text"
                name="idUser"
                id="idUser"
                placeholder="O ID pode ser visualizado na aba 'Usuários'"
                onChange={(event) => {
                  updateCod_usuario(event.target.value);
                }}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="name">ID da Tarefa</label>
              <input
                required
                type="text"
                name="idTask"
                id="idTaskr"
                placeholder="O ID pode ser visualizado na aba 'Tarefas'"
                onChange={(event) => {
                  updateCod_tarefa(event.target.value);
                }}
              />
            </div>
            <div className="actions">
              <Link to="/users" className="btn btn-warning margin-right-10">
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
