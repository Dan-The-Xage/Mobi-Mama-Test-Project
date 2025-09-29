import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { DashboardOverview } from './DashboardOverview';
import { PatientRegistration } from './PatientRegistration';
import { AppointmentScheduling } from './AppointmentScheduling';
import { VitalsTracking } from './VitalsTracking';
import { InsurancePanel } from './InsurancePanel';
import { EmergencyManagement } from './EmergencyManagement';
import { Analytics } from './Analytics';
import { MessageCenter } from './MessageCenter';
import { UserManagement } from './UserManagement';
import { useAuth } from '../../hooks/useAuth';

interface AdminDashboardProps {
  user: any;
  onBack: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onBack();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview user={user} />;
      case 'registration':
        return <PatientRegistration />;
      case 'appointments':
        return <AppointmentScheduling />;
      case 'vitals':
        return <VitalsTracking />;
      case 'insurance':
        return <InsurancePanel />;
      case 'emergency':
        return <EmergencyManagement />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <MessageCenter />;
      case 'users':
        return <UserManagement />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        user={user} 
        onLogout={handleLogout} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole={user.role}
        />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};