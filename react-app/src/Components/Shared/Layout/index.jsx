import React from "react";

export default function Nav() {
  return (
     <nav className="main-nav">
        <header>
            Controle de Tarefas
        </header>
        <ul className="nav-links">
            <div>
              <a className="nav-item" href="/users">
                <li>Usuários</li>
              </a>
              <a className="nav-item" href="/tarefas">
                <li>Tarefas</li>
              </a>
            </div>
            <div>
              <a className="nav-item" href="/">
                <li>Logout</li>
              </a>
            </div>
          </ul>
    </nav>
  )}
