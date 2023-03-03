import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tarefa from "./Components/Tarefa";
import Login from "./Components/Login";
import CadastroTarefa from "./Components/Tarefa/CadastroTarefa";
import Usuarios from "./Components/Usuarios";
import UsuarioTarefa from "./Components/Usuarios/UsuarioTarefa";
import CadastroUsuario from "./Components/Usuarios/CadastrarUsuario";
import AdicionarTarefas from "./Components/Usuarios/AdicionarTarefa";

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
