import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Plus, Bell, Search } from 'lucide-react';

// Mock announcements data
const mockAnnouncements = [
  {
    id: '1',
    title: 'New Project Launch',
    content: 'We\'re excited to announce that we\'ll be starting a new project with Client XYZ next week. More details to follow in the team meeting.',
    createdBy: '1',
    createdAt: '2025-06-10T14:30:00Z',
    priority: 'important',
    viewedBy: ['2', '3'],
  },
  {
    id: '2',
    title: 'Office Closure Notice',
    content: 'Please note that the office will be closed on July 4th for Independence Day. All deadlines will be adjusted accordingly.',
    createdBy: '1',
    createdAt: '2025-06-09T10:15:00Z',
    priority: 'normal',
    viewedBy: ['3'],
  },
  {
    id: '3',
    title: 'System Maintenance',
    content: 'The server will be down for maintenance this Saturday from 10 PM to 2 AM. Please save all your work before leaving on Friday.',
    createdBy: '1',
    createdAt: '2025-06-08T16:45:00Z',
    priority: 'urgent',
    viewedBy: ['2'],
  },
];

const AnnouncementsPage: React.FC = () => {
  const { user } = useAuth();
  const canCreateAnnouncements = user?.role !== UserRole.EMPLOYEE;
  
  // Function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  // Get priority badge style
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Bell className="w-3 h-3 mr-1" />
            Urgent
          </span>
        );
      case 'important':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Important
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Announcements</h2>
          {canCreateAnnouncements && (
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus size={16} className="mr-2" />
              New Announcement
            </button>
          )}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="max-w-md">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search announcements..."
            />
          </div>
        </div>
      </div>
      
      {/* Announcements List */}
      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                {getPriorityBadge(announcement.priority)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Posted on {formatDate(announcement.createdAt)}
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700 whitespace-pre-line">{announcement.content}</p>
            </div>
            {canCreateAnnouncements && (
              <div className="px-6 py-3 bg-gray-50 flex justify-end">
                <button className="text-sm text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                <button className="text-sm text-red-600 hover:text-red-800">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;