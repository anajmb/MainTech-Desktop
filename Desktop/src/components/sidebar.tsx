import '../styles/sidebar.css';
import logo from '../assets/img/logoBranca.png';

import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  ChartColumnIncreasing,
  SquareCheckBig,
  Grid2X2Plus
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../lib/axios';
import Header from './header';

// colocar função para que a nav se "esconda"
// o logout ainda não está funcionando corretamente

interface UserData {
    id: number;
    name: string;
    email: string;
    photo?: string;
}

export default function Sidebar() {
  const menuItems = [
    { key: 'home', label: 'Home', icon: <Home size={22} strokeWidth={1.6} />, to: '/home' },
    { key: 'transfers', label: 'Tarefas', icon: <SquareCheckBig size={22} strokeWidth={1.6} />, to: '/tarefas' },
    { key: 'documents', label: 'Documentos', icon: <FileText size={22} strokeWidth={1.6} />, to: '/documentos' },
    { key: 'dashboard', label: 'DashBoard', icon: <ChartColumnIncreasing size={22} strokeWidth={1.6} />, to: '/dashboard' },
    { key: 'teams', label: 'Equipes', icon: <Users size={22} strokeWidth={1.6} />, to: '/equipes' },
    { key: 'machine', label: 'Maquinas', icon: <Grid2X2Plus size={22} strokeWidth={1.6} />, to: '/maquinas' },
    { key: 'settings', label: 'Configurações', icon: <Settings size={22} strokeWidth={1.6} />, to: '/configuracoes' },
  ];

  const [loadingLogout, setLoadingLogout] = useState(false);
  const navigate = useNavigate();
  // const [user, setUser] = useState<UserData | null>(null);

  const handleLogout = async () => {
    if (!confirm("Deseja realmente sair da sua conta?")) return;
    try {
      setLoadingLogout(true);
      await api.post("/logout");
      // limpar tokens / estado de autenticação
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      // navegar para a rota de login (ajuste para sua rota de login, ex: '/' ou '/login')
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
      alert("Erro ao fazer logout. Tente novamente.");
    } finally {
      setLoadingLogout(false);
    }
  };

  // if (!user) {
  //   return (
  //     <div className="containerGeral">
  //       <Sidebar />
  //       <div className="containerPage">
  //         <Header />
  //         <p>Carregando...</p>
  //       </div>
  //     </div>
  //   );
  // }


  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Maintech" className="logo-image" />
      </div>
      <nav>
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.key}>
              <NavLink to={item.to} className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button className="signout" type="button" onClick={handleLogout}>
        <span className="signout-icon" >
          <LogOut size={22} strokeWidth={1.6} />
        </span>
        <span className="signout-label">Sair da conta</span>
      </button>
    </aside>
  );
}