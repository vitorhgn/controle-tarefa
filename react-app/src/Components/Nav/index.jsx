import React from "react";
import { Link } from 'react-router-dom';
import handleStorage from "../../storage/storage";

export default function Nav() {
  const storage = handleStorage();
  return (
     <nav className="main-nav">
        <header>
            Controle de Tarefas
        </header>
        <ul className="nav-links">
            <div>
              <Link to='/users' className="nav-item">
                <li>Usuários</li>
              </Link>
              <Link to='/users-tarefas' className="nav-item">
                <li>Usuário-Tarefa</li>
              </Link>
              <Link to='/tarefas' className="nav-item">
                <li>Tarefas</li>
              </Link>
            </div>
            <div>
              <Link onClick={()=>storage.clear()} to='/' className="nav-item">
                <li>Logout</li>
              </Link>
            </div>
          </ul>
    </nav>
  )}
