import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Save, User, Bell, Shield, Lock } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dados das abas
  const tabs = [
    { id: 'profile', label: 'Perfil', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notificações', icon: <Bell size={18} /> },
    { id: 'security', label: 'Segurança', icon: <Lock size={18} /> },
  ];
  
  // Adicionar aba Admin para papéis superiores
  if (user?.role !== UserRole.EMPLOYEE) {
    tabs.push({ id: 'admin', label: 'Configurações Admin', icon: <Shield size={18} /> });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Configurações</h2>
        <p className="text-gray-600 mt-1">Gerencie suas configurações e preferências da conta</p>
      </div>
      
      {/* Abas de Configurações */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </div>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Configurações de Perfil */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações do Perfil</h3>
              
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="mb-6 md:mb-0 flex flex-col items-center">
                  <div className="relative mb-4">
                    <img 
                      src={user?.avatar || "https://via.placeholder.com/150"}
                      alt="Perfil" 
                      className="h-32 w-32 rounded-full border border-gray-300"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-2 border-white hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                  <button className="text-sm text-blue-600">Enviar nova foto</button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        defaultValue={user?.name}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        defaultValue={user?.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Papel</label>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        disabled
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                        value={user?.role === UserRole.EXECUTIVE_MANAGER ? 'Gerente Executivo' : 
                               user?.role === UserRole.COORDINATOR ? 'Coordenador' : 'Funcionário'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Departamento</label>
                      <select
                        id="department"
                        name="department"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Gestão</option>
                        <option>Desenvolvimento</option>
                        <option>Marketing</option>
                        <option>Operações</option>
                        <option>RH</option>
                        <option>Vendas</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biografia</label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Escreva algumas frases sobre você"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={16} className="mr-2" />
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
        
        {/* Configurações de Notificações */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preferências de Notificação</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-base font-medium text-gray-800 mb-3">Notificações por Email</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-tasks"
                        name="email-tasks"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-tasks" className="font-medium text-gray-700">Atualizações de Tarefas</label>
                      <p className="text-gray-500">Receber emails quando tarefas são atribuídas, atualizadas ou concluídas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-announcements"
                        name="email-announcements"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-announcements" className="font-medium text-gray-700">Avisos</label>
                      <p className="text-gray-500">Receber emails para novos avisos da equipe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-reminders"
                        name="email-reminders"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-reminders" className="font-medium text-gray-700">Lembretes</label>
                      <p className="text-gray-500">Receber emails de lembrete para prazos e eventos próximos</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-base font-medium text-gray-800 mb-3">Notificações no Aplicativo</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="app-tasks"
                        name="app-tasks"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="app-tasks" className="font-medium text-gray-700">Atualizações de Tarefas</label>
                      <p className="text-gray-500">Receber notificações no aplicativo para alterações em tarefas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="app-comments"
                        name="app-comments"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="app-comments" className="font-medium text-gray-700">Comentários</label>
                      <p className="text-gray-500">Receber notificações quando alguém comentar em suas tarefas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-3">Frequência de Notificações</h4>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="email-frequency" className="block text-sm font-medium text-gray-700">Frequência do Resumo por Email</label>
                    <select
                      id="email-frequency"
                      name="email-frequency"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Imediatamente</option>
                      <option>Resumo diário</option>
                      <option>Resumo semanal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={16} className="mr-2" />
                Salvar Preferências
              </button>
            </div>
          </div>
        )}
        
        {/* Configurações de Segurança */}
        {activeTab === 'security' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações de Segurança</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-3">Alterar Senha</h4>
                
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Atualizar Senha
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-medium text-gray-800 mb-3">Autenticação de Dois Fatores</h4>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enable-2fa"
                      name="enable-2fa"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enable-2fa" className="font-medium text-gray-700">Ativar Autenticação de Dois Fatores</label>
                    <p className="text-gray-500">Adicione uma camada extra de segurança à sua conta exigindo um código de verificação além da sua senha.</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Saiba mais sobre autenticação de dois fatores
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-medium text-gray-800 mb-3">Sessões</h4>
                
                <p className="text-sm text-gray-600 mb-4">
                  Esta é uma lista de dispositivos que fizeram login na sua conta. Revogue qualquer sessão que você não reconheça.
                </p>
                
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Sessão Atual (Chrome no Windows)</p>
                          <p className="text-xs text-gray-500">
                            Última atividade: Agora mesmo
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ativa
                        </span>
                      </div>
                    </div>
                  </li>
                  
                  <li className="py-4 flex">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">iPhone 12 (Safari)</p>
                          <p className="text-xs text-gray-500">
                            Última atividade: 2 horas atrás
                          </p>
                        </div>
                        <button
                          type="button"
                          className="ml-4 text-xs text-red-600 hover:text-red-500"
                        >
                          Revogar
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Configurações de Admin (condicional) */}
        {activeTab === 'admin' && user?.role !== UserRole.EMPLOYEE && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações de Administrador</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-3">Configuração do Sistema</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                    <input
                      type="text"
                      name="company-name"
                      id="company-name"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue="Acme Inc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Fuso Horário Padrão</label>
                    <select
                      id="timezone"
                      name="timezone"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>UTC (GMT)</option>
                      <option>Horário de Brasília (BRT)</option>
                      <option>Horário do Amazonas (AMT)</option>
                      <option>Horário do Acre (ACT)</option>
                      <option>Horário de Fernando de Noronha (FNT)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">Formato de Data</label>
                    <select
                      id="date-format"
                      name="date-format"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>DD/MM/AAAA</option>
                      <option>MM/DD/AAAA</option>
                      <option>AAAA-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma do Sistema</label>
                    <select
                      id="language"
                      name="language"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Português</option>
                      <option>English</option>
                      <option>Español</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-medium text-gray-800 mb-3">Configuração de Tarefas</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="allow-task-creation"
                        name="allow-task-creation"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="allow-task-creation" className="font-medium text-gray-700">Permitir que funcionários criem tarefas</label>
                      <p className="text-gray-500">Se desativado, apenas gerentes e coordenadores podem criar tarefas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="require-approval"
                        name="require-approval"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="require-approval" className="font-medium text-gray-700">Exigir aprovação para conclusão de tarefas</label>
                      <p className="text-gray-500">Tarefas marcadas como concluídas precisarão de aprovação do gerente</p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="default-due-days" className="block text-sm font-medium text-gray-700">Dias padrão para vencimento de tarefas</label>
                    <input
                      type="number"
                      name="default-due-days"
                      id="default-due-days"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-48 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue="7"
                      min="1"
                    />
                    <p className="mt-1 text-xs text-gray-500">Número de dias a partir da data de criação para definir como data de vencimento padrão</p>
                  </div>
                </div>
              </div>
              
              {user?.role === UserRole.EXECUTIVE_MANAGER && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-base font-medium text-gray-800 mb-3">Gerenciamento de Dados</h4>
                  
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Exportar Dados do Sistema
                    </button>
                    
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Redefinir Dados do Sistema
                      </button>
                      <p className="mt-1 text-xs text-gray-500">
                        Aviso: Isso excluirá todas as tarefas, avisos e outros dados. Esta ação não pode ser desfeita.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={16} className="mr-2" />
                Salvar Configurações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;