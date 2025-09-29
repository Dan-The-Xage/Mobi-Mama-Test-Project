import React, { useState } from 'react';
import { ArrowLeft, Heart, Menu, X } from 'lucide-react';
import { PatientDashboard } from './PatientDashboard';
import { PatientProfile } from './PatientProfile';
import { Appointments } from './Appointments';
import { HealthEducation } from './HealthEducation';
import { Insurance } from './Insurance';
import { EmergencySOS } from './EmergencySOS';
import { PatientSidebar } from './PatientSidebar';

interface PatientAppProps {
  onBack: () => void;
}

export const PatientApp: React.FC<PatientAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock patient data
  const patient = {
    name: 'Fatima Ibrahim',
    id: '001',
    phone: '08012345678',
    lmp: '2024-01-15',
    edd: '2024-10-22',
    weeksPregnant: 16,
    nextApointment: '2024-02-15',
    riskLevel: 'normal'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PatientDashboard patient={patient} />;
      case 'profile':
        return <PatientProfile patient={patient} />;
      case 'appointments':
        return <Appointments patient={patient} />;
      case 'education':
        return <HealthEducation />;
      case 'insurance':
        return <Insurance patient={patient} />;
      case 'emergency':
        return <EmergencySOS patient={patient} />;
      default:
        return <PatientDashboard patient={patient} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">MobiMama+</h1>
                  <p className="text-xs text-gray-500">Your Health Companion</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <p className="text-xs text-gray-500">{patient.weeksPregnant} weeks pregnant</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">F</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <PatientSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};