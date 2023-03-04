import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tarefa from "./Pages/Tarefa";
import Login from "./Pages/Login";
import CadastroTarefa from "./Pages/Tarefa/CadastroTarefa";
import Usuarios from "./Pages/Usuarios";
import UsuarioTarefa from "./Pages/Usuarios/UsuarioTarefa";
import CadastroUsuario from "./Pages/Usuarios/CadastrarUsuario";
import AdicionarTarefas from "./Pages/Usuarios/AdicionarTarefa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/tarefas" element={<Tarefa/>}/>
        <Route path="/users" element={<Usuarios/>}/>
        <Route path="/cadastro-users" element={<CadastroUsuario/>}/>
        <Route path="/cadastro-tarefas" element={<CadastroTarefa/>}/>
        <Route path="/adicionar-tarefas" element={<AdicionarTarefas/>}/>
        <Route path="/users-tarefas" element={<UsuarioTarefa/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
