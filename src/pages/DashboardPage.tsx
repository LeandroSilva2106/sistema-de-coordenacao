import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { CheckCircle, Clock, AlertCircle, Calendar, UserPlus, MessageSquare } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Dashboard metrics would come from API in a real app
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
        return "Welcome to your executive dashboard! Here's an overview of your team's performance.";
      case UserRole.COORDINATOR:
        return "Welcome to your coordinator dashboard! Here's your team's current status.";
      case UserRole.EMPLOYEE:
        return "Welcome to your personal dashboard! Here's your current workload.";
      default:
        return "Welcome to your dashboard!";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{user?.name}'s Dashboard</h2>
        <p className="text-gray-600 mt-1">{renderWelcomeMessage()}</p>
      </div>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
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
              <p className="text-sm font-medium text-gray-600">In Progress</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
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
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-semibold text-gray-800">{metrics.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional content based on role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">Recent Tasks</h3>
            {(user?.role === UserRole.EXECUTIVE_MANAGER || user?.role === UserRole.COORDINATOR) && (
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Assign New Task
              </button>
            )}
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-3"></span>
                    <span className="text-gray-800">Update marketing materials</span>
                  </div>
                  <span className="text-sm text-gray-500">Due in 2 days</span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                    <span className="text-gray-800">Review quarterly reports</span>
                  </div>
                  <span className="text-sm text-gray-500">Due tomorrow</span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-3"></span>
                    <span className="text-gray-800">Client presentation preparation</span>
                  </div>
                  <span className="text-sm text-gray-500">Overdue by 1 day</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-800">Recent Announcements</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-800">Team Meeting</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Reminder: Weekly team meeting tomorrow at 10 AM in the conference room.
                </p>
                <p className="text-xs text-blue-500 mt-2">Posted 2 hours ago</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-md">
                <h4 className="font-medium text-amber-800">System Update</h4>
                <p className="text-sm text-amber-600 mt-1">
                  The system will be down for maintenance tonight from 11 PM to 12 AM.
                </p>
                <p className="text-xs text-amber-500 mt-2">Posted yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Role-specific content */}
      {(user?.role === UserRole.EXECUTIVE_MANAGER || user?.role === UserRole.COORDINATOR) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Overview (only for managers and coordinators) */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Team Overview</h3>
              {user?.role === UserRole.EXECUTIVE_MANAGER && (
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <UserPlus size={16} className="mr-1" />
                  Add Member
                </button>
              )}
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&4" 
                    alt="Team member" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Alex Johnson</p>
                    <p className="text-xs text-gray-500">3 tasks in progress</p>
                  </div>
                </li>
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&5" 
                    alt="Team member" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Maria Garcia</p>
                    <p className="text-xs text-gray-500">5 tasks completed</p>
                  </div>
                </li>
                <li className="py-3 flex items-center">
                  <img 
                    src="https://source.unsplash.com/random/200x200/?portrait&6" 
                    alt="Team member" 
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">David Kim</p>
                    <p className="text-xs text-gray-500">2 tasks pending</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <UserPlus size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Assign Tasks</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <Calendar size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Schedule Meeting</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <MessageSquare size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">Send Announcement</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <AlertCircle size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">View Reports</span>
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