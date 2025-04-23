import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserRole, User } from '../types';

// Usuários de demonstração
const MOCK_USERS = [
  {
    id: '1',
    name: 'João Gerente',
    email: 'gerente@exemplo.com',
    password: 'senha123',
    role: UserRole.EXECUTIVE_MANAGER,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&1',
  },
  {
    id: '2',
    name: 'Sara Coordenadora',
    email: 'coordenadora@exemplo.com',
    password: 'senha123',
    role: UserRole.COORDINATOR,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&2',
  },
  {
    id: '3',
    name: 'Miguel Funcionário',
    email: 'funcionario@exemplo.com',
    password: 'senha123',
    role: UserRole.EMPLOYEE,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&3',
  },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular atraso de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remover senha antes de salvar no estado/storage
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};