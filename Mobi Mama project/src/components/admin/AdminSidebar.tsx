import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Activity, 
  Shield, 
  AlertTriangle, 
  MessageCircle,
  X,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isOpen, 
  onClose, 
  userRole 
}) => {
  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview', roles: ['phc', 'moh', 'insurance'] },
    { id: 'registration', icon: Users, label: 'Patient Registration', roles: ['phc', 'moh'] },
    { id: 'appointments', icon: Calendar, label: 'Appointments', roles: ['phc', 'moh'] },
    { id: 'vitals', icon: Activity, label: 'Vitals & Risk', roles: ['phc', 'moh'] },
    { id: 'insurance', icon: Shield, label: 'Insurance Panel', roles: ['insurance', 'moh'] },
    { id: 'emergency', icon: AlertTriangle, label: 'Emergency Alerts', roles: ['phc', 'moh'] },
    { id: 'messages', icon: MessageCircle, label: 'Message Center', roles: ['phc', 'moh'] },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', roles: ['moh'] },
    { id: 'users', icon: Users, label: 'User Management', roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:mt-16
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <span className="text-lg font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};