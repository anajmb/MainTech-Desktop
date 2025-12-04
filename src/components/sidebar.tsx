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
import { useAuth } from "../contexts/authContext";
import { Bounce, toast, ToastContainer } from 'react-toastify';

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

  const { logout } = useAuth();
  const [, setLoadingLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
      setLoadingLogout(true);
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Erro ao fazer logout.");
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Maintech" className="logo-image" />
      </div>

      <nav>
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button className="signout" type="button" onClick={handleLogout}>
        <span className="signout-icon">
          <LogOut size={22} strokeWidth={1.6} />
        </span>
        <span className="signout-label">Sair da conta</span>
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastStyle={{ fontSize: '0.9em' }}
      />

    </aside>
  );
}
