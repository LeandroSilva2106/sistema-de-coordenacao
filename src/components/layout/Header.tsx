import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoleTranslations } from '../../types';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {children}
          <h1 className="ml-2 text-lg font-semibold text-gray-800">Sistema de Coordenação de Equipe</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100" title="Notificações">
            <Bell size={20} />
          </button>
          
          <Link to="/settings" className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100" title="Configurações">
            <Settings size={20} />
          </Link>
          
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">
                {user?.role && RoleTranslations[user.role]}
              </span>
            </div>
            
            <div className="relative">
              <button className="flex text-sm rounded-full focus:outline-none">
                <img 
                  className="h-8 w-8 rounded-full border border-gray-300"
                  src={user?.avatar || "https://via.placeholder.com/150"}
                  alt="Avatar do usuário"
                />
              </button>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="p-1 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;