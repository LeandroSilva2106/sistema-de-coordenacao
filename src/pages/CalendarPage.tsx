import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ChevronLeft, ChevronRight, Plus, Calendar, Users, MapPin, Clock } from 'lucide-react';

// Dados simulados de eventos
const mockEvents = [
  {
    id: '1',
    title: 'Reunião de Equipe',
    description: 'Sincronização semanal com a equipe de desenvolvimento',
    startTime: '2025-06-15T10:00:00Z',
    endTime: '2025-06-15T11:00:00Z',
    location: 'Sala de Conferência A',
    attendees: ['1', '2', '3'],
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Apresentação para Cliente',
    description: 'Apresentar resultados trimestrais para Cliente XYZ',
    startTime: '2025-06-16T14:00:00Z',
    endTime: '2025-06-16T15:30:00Z',
    location: 'Reunião Virtual',
    attendees: ['1', '2'],
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Planejamento de Projeto',
    description: 'Sessão de planejamento para a nova campanha de marketing',
    startTime: '2025-06-17T09:30:00Z',
    endTime: '2025-06-17T12:00:00Z',
    location: 'Sala de Conferência B',
    attendees: ['1', '2', '3'],
    createdBy: '2',
  },
];

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const canCreateEvents = user?.role !== UserRole.EMPLOYEE;
  
  // Estado da data atual
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  // Funções de navegação
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Utilitários de formatação de data
  const formatMonth = () => {
    return new Intl.DateTimeFormat('pt-BR', { 
      month: 'long', 
      year: 'numeric' 
    }).format(currentDate);
  };
  
  const formatEventTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return `${start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
  };

  // Gerar dias para o mês atual
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dia da semana para o primeiro dia (0 = Domingo, 6 = Sábado)
    const firstDayIndex = firstDay.getDay();
    // Total de dias no mês
    const daysInMonth = lastDay.getDate();
    
    // Criar array para todas as células do calendário (6 linhas x 7 dias)
    const days = [];
    
    // Adicionar células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    
    // Adicionar células para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  // Obter eventos para um dia específico
  const getEventsForDay = (date: Date) => {
    if (!date) return [];
    
    return mockEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  // Grade do calendário
  const calendarDays = generateCalendarDays();
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Calendário</h2>
          
          <div className="flex space-x-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md ${
                  view === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setView('month')}
              >
                Mês
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  view === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-t border-b border-r border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setView('week')}
              >
                Semana
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md ${
                  view === 'day' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-t border-b border-r border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setView('day')}
              >
                Dia
              </button>
            </div>
            
            {canCreateEvents && (
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus size={16} className="mr-2" />
                Criar Evento
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Navegação do Calendário */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={previousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h3 className="text-xl font-medium text-gray-900">{formatMonth()}</h3>
          
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Visualização Mensal */}
      {view === 'month' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekdays.map((day) => (
              <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`bg-white min-h-[100px] border-t ${
                  day && day.getDate() === new Date().getDate() && 
                  day.getMonth() === new Date().getMonth() && 
                  day.getFullYear() === new Date().getFullYear() 
                    ? 'bg-blue-50' 
                    : ''
                }`}
              >
                {day && (
                  <div className="p-1">
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        day.getDate() === new Date().getDate() && 
                        day.getMonth() === new Date().getMonth() && 
                        day.getFullYear() === new Date().getFullYear() 
                          ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white' 
                          : 'text-gray-700'
                      }`}>
                        {day.getDate()}
                      </span>
                    </div>
                    
                    <div className="mt-1 space-y-1">
                      {getEventsForDay(day).map((event) => (
                        <div 
                          key={event.id} 
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded truncate"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Lista de eventos (como uma visualização alternativa simplificada) */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Próximos Eventos</h3>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {mockEvents.map((event) => (
            <li key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-medium text-gray-900">{event.title}</h4>
                </div>
                
                <p className="text-sm text-gray-500">{event.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-gray-400" />
                    <span>{formatEventDate(event.startTime)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-gray-400" />
                    <span>{formatEventTime(event.startTime, event.endTime)}</span>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-gray-400" />
                  <div className="flex -space-x-1 overflow-hidden">
                    <img 
                      className="h-6 w-6 rounded-full border-2 border-white" 
                      src="https://source.unsplash.com/random/200x200/?portrait&9"
                      alt="Participante" 
                    />
                    <img 
                      className="h-6 w-6 rounded-full border-2 border-white" 
                      src="https://source.unsplash.com/random/200x200/?portrait&10"
                      alt="Participante" 
                    />
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs font-medium text-gray-500">
                      +3
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;