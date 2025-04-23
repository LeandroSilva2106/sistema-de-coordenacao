import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Download, BarChart2, PieChart, TrendingUp, Filter } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('performance');
  
  // Verificar se o usuário tem acesso a esta página
  if (user?.role === UserRole.EMPLOYEE) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acesso Restrito</h2>
        <p className="text-gray-600">Você não tem permissão para visualizar relatórios.</p>
      </div>
    );
  }

  // Abas para diferentes tipos de relatório
  const tabs = [
    { id: 'performance', label: 'Desempenho da Equipe', icon: <TrendingUp size={18} /> },
    { id: 'tasks', label: 'Análise de Tarefas', icon: <BarChart2 size={18} /> },
    { id: 'attendance', label: 'Presença', icon: <PieChart size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Relatórios e Análises</h2>
          
          {user?.role === UserRole.EXECUTIVE_MANAGER && (
            <div className="inline-flex rounded-md shadow-sm">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download size={16} className="mr-2" />
                Exportar Relatórios
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Abas de Relatório */}
      <div className="bg-white rounded-lg shadow-sm">
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
        
        {/* Conteúdo do Relatório */}
        <div className="p-6">
          {/* Filtros */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium mr-2">Período:</span>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
                <option>Ano atual</option>
                <option>Período personalizado</option>
              </select>
            </div>
            
            {activeTab === 'performance' && (
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-2">Equipe:</span>
                <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option>Todas as Equipes</option>
                  <option>Desenvolvimento</option>
                  <option>Marketing</option>
                  <option>Vendas</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Conteúdo baseado na aba ativa */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Visão Geral do Desempenho da Equipe</h3>
                
                {/* Placeholder para gráfico */}
                <div className="h-64 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <BarChart2 size={48} className="text-gray-300" />
                  <span className="ml-2 text-gray-500">Gráfico de Desempenho</span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Tarefas Concluídas</h4>
                    <p className="text-2xl font-bold text-gray-800">87%</p>
                    <span className="text-xs text-green-600">↑ 12% em relação ao período anterior</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Tempo Médio por Tarefa</h4>
                    <p className="text-2xl font-bold text-gray-800">2,4 dias</p>
                    <span className="text-xs text-red-600">↑ 0,3 dias em relação ao período anterior</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Eficiência da Equipe</h4>
                    <p className="text-2xl font-bold text-gray-800">92%</p>
                    <span className="text-xs text-green-600">↑ 5% em relação ao período anterior</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Desempenho Individual</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Funcionário
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarefas Concluídas
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tempo Médio
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Eficiência
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&11" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                              <div className="text-sm text-gray-500">Desenvolvimento</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          24
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          1,8 dias
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          95%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&12" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Maria Garcia</div>
                              <div className="text-sm text-gray-500">Marketing</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          18
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          2,1 dias
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          89%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&13" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">David Kim</div>
                              <div className="text-sm text-gray-500">Desenvolvimento</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          29
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          1,5 dias
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          97%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Distribuição de Status das Tarefas</h3>
                
                {/* Placeholder para gráfico */}
                <div className="h-64 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <PieChart size={48} className="text-gray-300" />
                  <span className="ml-2 text-gray-500">Gráfico de Distribuição de Tarefas</span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Concluídas</h4>
                    <p className="text-2xl font-bold text-gray-800">65%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Em Andamento</h4>
                    <p className="text-2xl font-bold text-gray-800">25%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Pendentes</h4>
                    <p className="text-2xl font-bold text-gray-800">10%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Tendência de Conclusão de Tarefas</h3>
                
                {/* Placeholder para gráfico */}
                <div className="h-64 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <TrendingUp size={48} className="text-gray-300" />
                  <span className="ml-2 text-gray-500">Gráfico de Tendência de Conclusão</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Visão Geral de Presença da Equipe</h3>
                
                {/* Placeholder para gráfico */}
                <div className="h-64 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <BarChart2 size={48} className="text-gray-300" />
                  <span className="ml-2 text-gray-500">Gráfico de Presença</span>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Presentes</h4>
                    <p className="text-2xl font-bold text-gray-800">92%</p>
                    <span className="text-xs text-green-600">↑ 3% em relação ao mês anterior</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Atrasos</h4>
                    <p className="text-2xl font-bold text-gray-800">4%</p>
                    <span className="text-xs text-green-600">↓ 2% em relação ao mês anterior</span>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500">Ausências</h4>
                    <p className="text-2xl font-bold text-gray-800">4%</p>
                    <span className="text-xs text-amber-600">↓ 1% em relação ao mês anterior</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Presença Individual</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Funcionário
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Presentes
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Atrasos
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ausências
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&14" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                              <div className="text-sm text-gray-500">Desenvolvimento</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          95%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          3%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          2%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&15" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Maria Garcia</div>
                              <div className="text-sm text-gray-500">Marketing</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          90%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          5%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          5%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/random/200x200/?portrait&16" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">David Kim</div>
                              <div className="text-sm text-gray-500">Desenvolvimento</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          97%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          2%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          1%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;