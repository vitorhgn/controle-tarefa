import React from "react";
import "./style.css";

function redireciona(){
  window.location.href="/users";
}

export default function Login() {
  return (
    <section className="section-login">
    <div className="container">
      <form id="form-login" method="post">
        <div className="form-group">
          <label htmlFor="inputLogin">Usuário</label>
          <input
            id="inputLogin"
            required
            type="text"
            name="text"
            placeholder="Digite seu usuário"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Senha</label>
          <input
            id="inputPassword"
            required
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </div>
        <div className="button-group input-btn">
          <input type="submit" value="Entrar" onClick={() => redireciona()}/>
        </div>
      </form>
    </div>
  </section>
  );
}
