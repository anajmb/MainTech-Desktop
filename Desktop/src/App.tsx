import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/index/index";
import Home from "./pages/home/home";
import Tarefas from "./pages/tarefas/tarefas";
import Documentos from "./pages/documentos/documentos";
import Equipes from "./pages/equipes/equipes";
import Dashboard from "./pages/dashboard/dashboard";
import NovaTarefa from "./pages/tarefas/novaTarefa";
import Configuracoes from "./pages/configuracoes/configuracoes";
import CadastrarUsuario from "./pages/equipes/cadastrarUsuario";
import Agenda from "./pages/home/agenda";
import CadastrarMaquinas from "./pages/maquinas/cadastrarMaquinas";
import Cadastro from "./pages/index/cadastro";
import RecuperarCodigo from "./pages/index/recuperarCodigo";
import RecuperarEmail from "./pages/index/recuperarEmail";
import RecuperarSenha from "./pages/index/recuperarSenha";

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarEmail />} />
          <Route path="/recuperar-senha/codigo" element={<RecuperarCodigo />} />
          <Route path="/recuperar-senha/codigo/nova-senha" element={<RecuperarSenha />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/tarefas/nova" element={<NovaTarefa />} />
          <Route path="/equipes/cadastrar-usuario" element={< CadastrarUsuario/>} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/equipes" element={<Equipes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home/agenda" element={<Agenda />} />
          <Route path="/maquinas" element={<CadastrarMaquinas />} />
        </Routes>
      </BrowserRouter>

      {/*
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>*/}
    </>
  )
}

export default App
