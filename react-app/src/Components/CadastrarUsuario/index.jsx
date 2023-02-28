import React from "react";
import "./style.css";
import Nav from "./../Shared/Layout";

export default function CadastroUsuario() {
  return (
    <>
<Nav/>
<section className="container">
        <header className="main-header">
            Cadastro de Usuários
        </header>
            <div className="content">
                <form id="studentForm" className="form" method="post">
                    <div className="form-group1">
                        <label htmlFor="name">Nome</label>
                        <input required type="text" name="name" id="name"/>
                    </div>
                    <div className="form-group1">
                        <label htmlFor="usuario">Usuário</label>
                        <input required type="text" name="usuario" id="usuario"/>
                    </div>
                    <div className="form-group1">
                        <label htmlFor="situacao">Função</label>
                        <select id="situacao" name="situacao">
                          <option value="Operador">Operador</option>
                          <option value="Supervisor">Supervisor</option>
                        </select>
                    </div>
                    <div className="form-group1">
                        <label htmlFor="password">Senha</label>
                        <input required type="password" name="password" id="password"/>
                    </div>
                    <div className="actions">
                        <a href='/users' className="btn btn-warning margin-right-10">Cancelar</a>
                        <button className="btn">Salvar</button>
                    </div>
                </form>
            </div>
    </section>
    </>
  )}
