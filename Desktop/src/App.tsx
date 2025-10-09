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

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/tarefas/nova" element={<NovaTarefa />} />
          {/* <Route path="/equipes/cadastrarUsuario" element={< />} /> */}
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/equipes" element={<Equipes />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
