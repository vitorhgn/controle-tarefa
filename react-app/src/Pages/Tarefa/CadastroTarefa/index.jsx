import React from "react";
import "./style.css";
import Nav from "../../../Components/Nav";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CadastroTarefa() {


  const [isRedirect, setIsRedirect] = useState(false);

  const [nome, updateNome] = useState("");
  const [tipo, updateTipo] = useState("");


  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      nome,
      tipo,
    };

    let methodEndPoint;
    let urlEndPoint;

    methodEndPoint = "POST";
    urlEndPoint = "http://localhost:3009/admin/tarefa/create";

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
    return <Navigate to="/tarefas" />;
  }

  return (
    <>
      <Nav />
      <section className="container">
        <header className="main-header">Cadastro de Tarefas</header>
        <div className="content">
          <form
            id="tarefaForm"
            className="form"
            method="post"
            onSubmit={onSubmitForm}
          >
            <div className="form-group1">
              <label htmlFor="nome">Nome da Tarefa</label>
              <input
                required
                type="text"
                name="nome"
                id="nome"
                placeholder="Insira o nome da nova tarefa"
                value={nome}
                onChange={(event) => {
                  updateNome(event.target.value);
                }}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="situacao">Tipo</label>
              <select
                id="situacao"
                name="situacao"
                onChange={(event) => {
                  updateTipo(event.target.value);
                }}
              >
                <option value="">Selecione</option>
                <option value="D">Diaria</option>
                <option value="S">Semanal</option>
                <option value="Q">Quinzenal</option>
                <option value="M">Mensal</option>
              </select>
            </div>
            <div className="actions">
              <Link to='/tarefas' className="btn btn-warning margin-right-10">Cancelar</Link>
              <button className="btn">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
