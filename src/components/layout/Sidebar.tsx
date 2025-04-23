import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Bell, 
  Calendar, 
  Users, 
  BarChart, 
  Settings,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">TeamCo</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 lg:hidden hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="px-2 py-4 space-y-1">
          <NavLink to="/dashboard" className={navLinkClass} onClick={onClose}>
            <LayoutDashboard size={18} className="mr-3" />
            <span>Painel</span>
          </NavLink>
          
          <NavLink to="/tasks" className={navLinkClass} onClick={onClose}>
            <CheckSquare size={18} className="mr-3" />
            <span>Tarefas</span>
          </NavLink>
          
          <NavLink to="/announcements" className={navLinkClass} onClick={onClose}>
            <Bell size={18} className="mr-3" />
            <span>Avisos</span>
          </NavLink>
          
          <NavLink to="/calendar" className={navLinkClass} onClick={onClose}>
            <Calendar size={18} className="mr-3" />
            <span>Calendário</span>
          </NavLink>
          
          {/* Conditional menu items based on role */}
          {user?.role !== UserRole.EMPLOYEE && (
            <>
              <NavLink to="/users" className={navLinkClass} onClick={onClose}>
                <Users size={18} className="mr-3" />
                <span>Gestão de Usuários</span>
              </NavLink>
              
              <NavLink to="/reports" className={navLinkClass} onClick={onClose}>
                <BarChart size={18} className="mr-3" />
                <span>Relatórios</span>
              </NavLink>
            </>
          )}
          
          <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
            <Settings size={18} className="mr-3" />
            <span>Configurações</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;