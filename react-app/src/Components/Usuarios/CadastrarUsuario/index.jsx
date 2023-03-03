import React from "react";
import "./style.css";
import Nav from "../../Shared/Layout";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CadastroUsuario() {

  const [isRedirect, setIsRedirect] = useState(false);

  const [nome, updateNome] = useState("");
  const [direito, updateDireito] = useState("");
  const [senha, updateSenha] = useState("");


  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      nome,
      direito,
      senha,
    };

    let methodEndPoint;
    let urlEndPoint;

    methodEndPoint = "POST";
    urlEndPoint = "http://localhost:3009/admin/user/create";

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
    return <Navigate to="/users" />;
  }

  return (
    <>
      <Nav />
      <section className="container">
        <header className="main-header">Cadastro de Usuários</header>
        <div className="content">
          <form
            id="usersForm"
            className="form"
            method="post"
            onSubmit={onSubmitForm}
          >
            <div className="form-group1">
              <label htmlFor="name">Nome</label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Insira o nome do novo usuário"
                onChange={(event) => {
                  updateNome(event.target.value);
                }}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="direito">Função</label>
              <select
                id="direito"
                name="direito"
                onChange={(event) => {
                  updateDireito(event.target.value);
                }}
              >
                <option value="">Selecione</option>
                <option value="O">Operador</option>
                <option value="S">Supervisor</option>
              </select>
            </div>
            <div className="form-group1">
              <label htmlFor="password">Senha</label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Insira uma senha"
                onChange={(event) => {
                  updateSenha(event.target.value);
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
