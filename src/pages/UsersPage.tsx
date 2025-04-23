import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Search, UserPlus, Edit, Trash2, Lock, MoreHorizontal } from 'lucide-react';

// Dados simulados de usuários
const mockUsers = [
  {
    id: '1',
    name: 'João Gerente',
    email: 'gerente@exemplo.com',
    role: UserRole.EXECUTIVE_MANAGER,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&1',
    status: 'active',
    department: 'Gestão',
  },
  {
    id: '2',
    name: 'Sara Coordenadora',
    email: 'coordenadora@exemplo.com',
    role: UserRole.COORDINATOR,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&2',
    status: 'active',
    department: 'Operações',
  },
  {
    id: '3',
    name: 'Miguel Funcionário',
    email: 'funcionario@exemplo.com',
    role: UserRole.EMPLOYEE,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&3',
    status: 'active',
    department: 'Desenvolvimento',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily@exemplo.com',
    role: UserRole.EMPLOYEE,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&4',
    status: 'active',
    department: 'Marketing',
  },
  {
    id: '5',
    name: 'Roberto Silva',
    email: 'roberto@exemplo.com',
    role: UserRole.EMPLOYEE,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&5',
    status: 'inactive',
    department: 'Vendas',
  },
  {
    id: '6',
    name: 'Jessica Patel',
    email: 'jessica@exemplo.com',
    role: UserRole.COORDINATOR,
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&6',
    status: 'active',
    department: 'RH',
  },
];

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  
  // Verificar se o usuário tem acesso a esta página
  if (user?.role === UserRole.EMPLOYEE) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acesso Restrito</h2>
        <p className="text-gray-600">Você não tem permissão para gerenciar usuários.</p>
      </div>
    );
  }
  
  // Filtrar usuários com base na busca e filtro de papel
  const filteredUsers = users.filter(u => {
    // Filtro por papel
    if (filterRole !== 'all' && u.role !== filterRole) {
      return false;
    }
    
    // Filtro por busca
    if (searchTerm && !u.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !u.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Formatar exibição do papel
  const formatRole = (role: UserRole) => {
    switch (role) {
      case UserRole.EXECUTIVE_MANAGER:
        return 'Gerente Executivo';
      case UserRole.COORDINATOR:
        return 'Coordenador';
      case UserRole.EMPLOYEE:
        return 'Funcionário';
      default:
        return role;
    }
  };
  
  // Obter badge de status
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
          Ativo
        </span>
      );
    } else {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-gray-100 text-gray-800">
          Inativo
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Gestão de Usuários</h2>
          
          {user?.role === UserRole.EXECUTIVE_MANAGER && (
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <UserPlus size={16} className="mr-2" />
              Adicionar Usuário
            </button>
          )}
        </div>
      </div>
      
      {/* Busca e Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative rounded-md shadow-sm max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Todos os Papéis</option>
            <option value={UserRole.EXECUTIVE_MANAGER}>Gerentes Executivos</option>
            <option value={UserRole.COORDINATOR}>Coordenadores</option>
            <option value={UserRole.EMPLOYEE}>Funcionários</option>
          </select>
        </div>
      </div>
      
      {/* Tabela de Usuários */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatRole(user.role)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button className="text-amber-600 hover:text-amber-900" title="Alterar Senha">
                        <Lock size={18} />
                      </button>
                      {user.role !== UserRole.EXECUTIVE_MANAGER && (
                        <button className="text-red-600 hover:text-red-900" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-500" title="Mais Opções">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Nenhum usuário encontrado com os critérios de busca.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Explicação das Permissões de Usuário */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permissões por Papel de Usuário</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-600 mb-2">Gerente Executivo</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acesso a todas as funcionalidades</li>
              <li>• Criar e gerenciar contas de usuário</li>
              <li>• Visualizar e gerar relatórios</li>
              <li>• Gerenciar configurações do sistema</li>
              <li>• Ver métricas de desempenho da equipe</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-600 mb-2">Coordenador</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Gerenciar membros da equipe</li>
              <li>• Atribuir e acompanhar tarefas</li>
              <li>• Criar e visualizar relatórios</li>
              <li>• Enviar avisos para a equipe</li>
              <li>• Não pode gerenciar Gerentes Executivos</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-600 mb-2">Funcionário</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ver e atualizar tarefas atribuídas</li>
              <li>• Ver avisos da equipe</li>
              <li>• Atualizar informações do perfil</li>
              <li>• Acesso limitado a relatórios</li>
              <li>• Sem permissões de gestão de usuários</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;