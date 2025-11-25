import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/index";
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
import Cadastro from "./pages/auth/cadastro";
import RecuperarCodigo from "./pages/auth/recuperarCodigo";
import RecuperarEmail from "./pages/auth/recuperarSenha";
import RecuperarSenha from "./pages/auth/redefinirSenha";
import Privacidade from "./pages/configuracoes/privacidade";
import NotFound from "./components/notFound";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/protectedRouter";
import OrdemServico from "./pages/documentos/ordemServiço";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<RecuperarEmail />} />
            <Route path="/recuperar-senha/codigo" element={<RecuperarCodigo />} />
            <Route path="/recuperar-senha/codigo/redefinir-senha" element={<RecuperarSenha />} />
            <Route path="*" element={<NotFound />} />


            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="/tarefas" element={<ProtectedRoute> <Tarefas /> </ProtectedRoute>} />
            <Route path="/tarefas/nova" element={<ProtectedRoute> <NovaTarefa /> </ProtectedRoute>} />
            <Route path="/equipes/cadastrar-usuario" element={<ProtectedRoute> <CadastrarUsuario /> </ProtectedRoute>} />
            <Route path="/documentos" element={<ProtectedRoute> <Documentos /> </ProtectedRoute>} />
            <Route path="/documentos/ordem-servico" element={<ProtectedRoute> <OrdemServico /> </ProtectedRoute>} />
            <Route path="/configuracoes" element={<ProtectedRoute> <Configuracoes /> </ProtectedRoute>} />
            <Route path="/equipes" element={<ProtectedRoute> <Equipes /> </ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/home/agenda" element={<ProtectedRoute> <Agenda /> </ProtectedRoute>} />
            <Route path="/maquinas" element={<ProtectedRoute> <CadastrarMaquinas /> </ProtectedRoute>} />
            <Route path="/configuracoes/privacidade" element={<ProtectedRoute> <Privacidade /> </ProtectedRoute>} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App