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
              <Link to='/users-tarefas' className="nav-item">
                <li>Lista de tarefas</li>
              </Link>
              <Link to='/users' className="nav-item">
                <li>Todos os usuários</li>
              </Link>
              <Link to='/tarefas' className="nav-item">
                <li>Todas as tarefas</li>
              </Link>
            </div>
            <div className="logout">
              <Link onClick={()=>storage.clear()} to='/' className="nav-item">
                <li>Logout</li>
              </Link>
            </div>
          </ul>
    </nav>
  )}
