import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserRole, User } from '../types';

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Manager',
    email: 'manager@example.com',
    password: 'password123',
    role: UserRole.EXECUTIVE_MANAGER,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&1',
  },
  {
    id: '2',
    name: 'Sara Coordinator',
    email: 'coordinator@example.com',
    password: 'password123',
    role: UserRole.COORDINATOR,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&2',
  },
  {
    id: '3',
    name: 'Mike Employee',
    email: 'employee@example.com',
    password: 'password123',
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
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password before saving to state/storage
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};