import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, Task } from '../types';
import { Plus, Filter, Search, ArrowUp, ArrowDown, Check, Clock, AlertCircle } from 'lucide-react';

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete quarterly report',
    description: 'Finalize the Q3 performance report with updated metrics and charts',
    status: 'in-progress',
    priority: 'high',
    assignedTo: ['2', '3'],
    createdBy: '1',
    createdAt: '2025-06-10T10:00:00Z',
    dueDate: '2025-06-15T23:59:59Z',
    comments: [
      {
        id: '101',
        text: 'I\'ve added the sales numbers to section 3',
        userId: '3',
        timestamp: '2025-06-12T14:30:00Z',
      }
    ],
  },
  {
    id: '2',
    title: 'Update client presentation',
    description: 'Revise slides for the upcoming client meeting',
    status: 'pending',
    priority: 'medium',
    assignedTo: ['3'],
    createdBy: '1',
    createdAt: '2025-06-11T09:00:00Z',
    dueDate: '2025-06-18T15:00:00Z',
    comments: [],
  },
  {
    id: '3',
    title: 'Research market trends',
    description: 'Gather and analyze recent industry reports for strategy meeting',
    status: 'completed',
    priority: 'low',
    assignedTo: ['2'],
    createdBy: '1',
    createdAt: '2025-06-05T11:30:00Z',
    dueDate: '2025-06-12T17:00:00Z',
    comments: [
      {
        id: '102',
        text: 'Completed analysis, will share findings in meeting',
        userId: '2',
        timestamp: '2025-06-11T16:45:00Z',
      }
    ],
  },
];

const TasksPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks] = useState<Task[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const canCreateTasks = user?.role !== UserRole.EMPLOYEE;
  
  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      const aTime = new Date(a.dueDate).getTime();
      const bTime = new Date(b.dueDate).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    } else if (sortBy === 'priority') {
      const priorityMap = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityMap[a.priority] || 0;
      const bPriority = priorityMap[b.priority] || 0;
      return sortDirection === 'asc' ? aPriority - bPriority : bPriority - aPriority;
    }
    return 0;
  });
  
  const toggleSort = (field: 'dueDate' | 'priority') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }).format(date);
  };
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertCircle size={12} className="mr-1" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };
  
  // Render priority indicator
  const renderPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Tasks Management</h2>
          {canCreateTasks && (
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus size={16} className="mr-2" />
              Create Task
            </button>
          )}
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative rounded-md shadow-sm max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => toggleSort('dueDate')}
            >
              Due Date
              {sortBy === 'dueDate' && (
                sortDirection === 'asc' ? 
                <ArrowUp size={16} className="ml-1" /> : 
                <ArrowDown size={16} className="ml-1" />
              )}
            </button>
            
            <button 
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => toggleSort('priority')}
            >
              Priority
              {sortBy === 'priority' && (
                sortDirection === 'asc' ? 
                <ArrowUp size={16} className="ml-1" /> : 
                <ArrowDown size={16} className="ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {sortedTasks.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {sortedTasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                      {renderStatusBadge(task.status)}
                      {renderPriorityIndicator(task.priority)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 pt-2">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>Due: {formatDate(task.dueDate)}</span>
                      
                      <span className="mx-2">•</span>
                      
                      <div className="flex -space-x-1 overflow-hidden">
                        {/* This would map through assigned users in a real app */}
                        <img 
                          className="h-6 w-6 rounded-full border-2 border-white" 
                          src="https://source.unsplash.com/random/200x200/?portrait&7"
                          alt="Assigned user" 
                        />
                        <img 
                          className="h-6 w-6 rounded-full border-2 border-white" 
                          src="https://source.unsplash.com/random/200x200/?portrait&8"
                          alt="Assigned user" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 sm:mt-0">
                      <span className="mr-2">{task.comments.length} comments</span>
                      
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 px-6 text-center">
            <p className="text-gray-500">No tasks match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;