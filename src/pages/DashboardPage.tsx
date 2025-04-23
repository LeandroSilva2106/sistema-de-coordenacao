import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { CheckCircle, Clock, AlertCircle, Calendar, UserPlus, MessageSquare } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  const metrics = {
    taskStats: {
      completed: 24,
      inProgress: 12,
      pending: 8,
    },
    announcements: 3,
    upcomingEvents: 5,
    teamMembers: 8,
  };

  const renderWelcomeMessage = () => {
    switch (user?.role) {
      case UserRole.EXECUTIVE_MANAGER:
        return "Bem-vindo ao seu painel executivo! Aqui está uma visão geral do desempenho da sua equipe.";
      case UserRole.COORDINATOR:
        return "Bem-vindo ao seu painel de coordenação! Aqui está o status atual da sua equipe.";
      case UserRole.EMPLOYEE:
        return "Bem-vindo ao seu painel pessoal! Aqui está sua carga de trabalho atual.";
      default:
        return "Bem-vindo ao seu painel!";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Painel de {user?.name}</h2>
        <p className="text-gray-600 mt-1">{renderWelcomeMessage()}</p>
      </div>
      
      {/* Cards do Painel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tarefas Concluídas</p>
              <p className="text-2xl font-semibold text-gray-800">{metrics.taskStats.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Em Andamento</p>
              <p className="text-2xl font-semibold text-gray-800">{metrics.taskStats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-500 mr-4">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tarefas Pendentes</p>
              <p className="text-2xl font-semibold text-gray-800">{metrics.taskStats.pending}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Eventos Próximos</p>
              <p className="text-2xl font-semibold text-gray-800">{metrics.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo adicional baseado no papel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tarefas Recentes */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Tarefas Recentes</h3>
            {(user?.role === UserRole.EXECUTIVE_MANAGER || user?.role === UserRole.COORDINATOR) && (
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Atribuir Nova Tarefa
              </button>
            )}
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-3"></span>
                    <span className="text-gray-800">Atualizar materiais de marketing</span>
                  </div>
                  <span className="text-sm text-gray-500">Vence em 2 dias</span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                    <span className="text-gray-800">Revisar relatórios trimestrais</span>
                  </div>
                  <span className="text-sm text-gray-500">Vence amanhã</span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-3"></span>
                    <span className="text-gray-800">Preparação da apresentação para o cliente</span>
                  </div>
                  <span className="text-sm text-gray-500">Atrasado por 1 dia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Avisos Recentes */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-800">Avisos Recentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-800">Reunião de Equipe</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Lembrete: Reunião semanal de equipe amanhã às 10h na sala de conferência.
                </p>
                <p className="text-xs text-blue-500 mt-2">Publicado há 2 horas</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-md">
                <h4 className="font-medium text-amber-800">Atualização do Sistema</h4>
                <p className="text-sm text-amber-600 mt-1">
                  O sistema estará em manutenção hoje das 23h às 00h.
                </p>
                <p className="text-xs text-amber-500 mt-2">Publicado ontem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo específico por papel */}
      {(user?.role === UserRole.EXECUTIVE_MANAGER || user?.role === UserRole.COORDINATOR) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visão Geral da Equipe (apenas para gerentes e coordenadores) */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Visão Geral da Equipe</h3>
              {user?.role === UserRole.EXECUTIVE_MANAGER && (
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <UserPlus size={16} className="mr-1" />
                  Adicionar Membro
                </button>
              )}
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&4" 
                    alt="Membro da equipe" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Alex Johnson</p>
                    <p className="text-xs text-gray-500">3 tarefas em andamento</p>
                  </div>
                </li>
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&5" 
                    alt="Membro da equipe" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Maria Garcia</p>
                    <p className="text-xs text-gray-500">5 tarefas concluídas</p>
                  </div>
                </li>
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&6" 
                    alt="Membro da equipe" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">David Kim</p>
                    <p className="text-xs text-gray-500">2 tarefas pendentes</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Ações Rápidas */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-800">Ações Rápidas</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <UserPlus size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Atribuir Tarefas</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <Calendar size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Agendar Reunião</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <MessageSquare size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Enviar Aviso</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <AlertCircle size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Ver Relatórios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;