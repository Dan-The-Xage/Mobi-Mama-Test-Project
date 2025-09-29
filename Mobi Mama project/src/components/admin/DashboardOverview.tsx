import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Heart,
  Shield,
  FileText
} from 'lucide-react';

interface DashboardOverviewProps {
  user: any;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user }) => {
  const stats = [
    { 
      title: 'Total Patients', 
      value: '1,247', 
      change: '+12%', 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Appointments Today', 
      value: '34', 
      change: '+8%', 
      icon: Calendar, 
      color: 'bg-green-500' 
    },
    { 
      title: 'High Risk Cases', 
      value: '23', 
      change: '-5%', 
      icon: AlertTriangle, 
      color: 'bg-red-500' 
    },
    { 
      title: 'Insurance Coverage', 
      value: '78%', 
      change: '+15%', 
      icon: Shield, 
      color: 'bg-purple-500' 
    },
  ];

  const recentActivities = [
    { type: 'registration', message: 'New patient registered: Fatima Ibrahim', time: '2 minutes ago' },
    { type: 'appointment', message: 'Appointment scheduled for Aisha Mohammed', time: '15 minutes ago' },
    { type: 'vitals', message: 'High BP recorded for patient ID: 1234', time: '1 hour ago' },
    { type: 'emergency', message: 'Emergency alert resolved', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-blue-100">Here's what's happening at {user.facility} today</p>
          </div>
          <Heart className="h-12 w-12 text-white opacity-80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-900">Register New Patient</span>
              </div>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-900">Schedule Appointment</span>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-purple-900">Record Vitals</span>
              </div>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Fatima Ibrahim</td>
                <td className="px-4 py-3 text-sm text-gray-500">09:00 AM</td>
                <td className="px-4 py-3 text-sm text-gray-500">ANC Visit</td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Aisha Mohammed</td>
                <td className="px-4 py-3 text-sm text-gray-500">11:30 AM</td>
                <td className="px-4 py-3 text-sm text-gray-500">Follow-up</td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};