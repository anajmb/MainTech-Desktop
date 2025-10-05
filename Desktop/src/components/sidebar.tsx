import '../styles/sidebar.css';
import logo from '../assets/img/logoBranca.png';

import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  ChartColumnIncreasing,
  SquareCheckBig
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { key: 'home', label: 'Home', icon: <Home size={22} strokeWidth={1.6} />, to: '/home' },
    { key: 'transfers', label: 'Tarefas', icon: <SquareCheckBig size={22} strokeWidth={1.6} />, to: '/tarefas' },
    { key: 'documents', label: 'Documentos', icon: <FileText size={22} strokeWidth={1.6} />, to: '/documentos' },
    { key: 'dashboard', label: 'DashBoard', icon: <ChartColumnIncreasing size={22} strokeWidth={1.6} />, to: '/dashboard' },
    { key: 'teams', label: 'Equipes', icon: <Users size={22} strokeWidth={1.6} />, to: '/equipes' },
    { key: 'settings', label: 'Configurações', icon: <Settings size={22} strokeWidth={1.6} />, to: '/configuracao' },
  ];

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
      <button className="signout" type="button">
        <span className="signout-icon">
          <LogOut size={22} strokeWidth={1.6} />
        </span>
        <span className="signout-label">Sair da conta</span>
      </button>
    </aside>
  );
}