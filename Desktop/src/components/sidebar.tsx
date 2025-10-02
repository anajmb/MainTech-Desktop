import { useState } from 'react';
import '../styles/sidebar.css';
import logo from '../assets/img/logoBranca.png'; // Importe a logo corretamente
 
// ALTERADO: Importando os ícones da biblioteca lucide-react
import {
  Home,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  LucideLayoutDashboard,  
  ChartBar,
  ChartColumn,
  Files,
  ChartColumnIncreasing,
  SquareCheckBig
} from 'lucide-react';
 
function Sidebar() {
  const logoSrc = '/maintech-logo.png';
 
  const [imgError, setImgError] = useState(false);
 
  // ALTERADO: O array de menu agora usa os componentes de ícone do Lucide
  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: <Home size={18} strokeWidth={1.6} />
    },
    {
      key: 'transfers',
      label: 'Tarefas',
      // Escolhi ClipboardList para "Tarefas", que é mais adequado
      icon: <SquareCheckBig size={18} strokeWidth={1.6} />
    },
    {
      key: 'documents',
      label: 'Documentos',
      icon: <FileText size={18} strokeWidth={1.6} />
    },
    {
      key: 'dashboard',
      label: 'DashBoard',
      icon: <ChartColumnIncreasing  size={18} strokeWidth={1.6} />
    },
    {
      key: 'teams',
      label: 'Equipes',
      icon: <Users size={18} strokeWidth={1.6} />
    },
    {
      key: 'settings',
      label: 'Configurações',
      icon: <Settings size={18} strokeWidth={1.6} />
    }
  ];
 
  return (
    <aside className="sidebar" aria-label="Barra lateral principal">
      <h2 className="logo">
        {!imgError ? (
          <img
            src={logoSrc}
            alt="Maintech"
            className="logo-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="logo-img-fallback" aria-label="Logo não disponível" />
        )}
       
        <img src= {logo} alt="" className='logo-image' />
   
      </h2>
 
      <nav>
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.key}>
              <a href="#" className="menu-link" aria-label={item.label}>
                <span className="icon" aria-hidden="true">{item.icon}</span>
                <span className="label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
 
      {/* A seção de perfil do usuário permanece como estava no seu código original */}
      <div className="user-profile">
        {/* ...existing code... */}
      </div>
 
      <button className="signout" type="button" aria-label="Sair da conta">
        <span className="signout-icon" aria-hidden="true">
          {/* ALTERADO: Ícone de sair também foi atualizado */}
          <LogOut size={16} strokeWidth={1.6} />
        </span>
        <span className="signout-label">Sair da conta</span>
      </button>
    </aside>
  );
}
 
export default Sidebar;