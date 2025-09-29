import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  CheckCircle,
  AlertTriangle,
  Phone
} from 'lucide-react';

interface AppointmentsProps {
  patient: any;
}

export const Appointments: React.FC<AppointmentsProps> = ({ patient }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const appointments = [
    {
      id: 1,
      type: 'ANC Visit',
      date: '2024-02-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      location: 'Gombe Central PHC',
      status: 'upcoming',
      notes: 'Routine check-up and vitals',
      reminder: '1 day before'
    },
    {
      id: 2,
      type: 'Ultrasound',
      date: '2024-03-01',
      time: '2:00 PM',
      doctor: 'Dr. Michael Chen',
      location: 'Gombe General Hospital',
      status: 'upcoming',
      notes: 'Anatomy scan',
      reminder: '2 days before'
    },
    {
      id: 3,
      type: 'ANC Visit',
      date: '2024-01-15',
      time: '09:00 AM',
      doctor: 'Dr. Sarah Johnson',
      location: 'Gombe Central PHC',
      status: 'completed',
      notes: 'Blood pressure check, weight measurement',
      reminder: 'Completed'
    },
    {
      id: 4,
      type: 'Blood Test',
      date: '2024-01-08',
      time: '11:30 AM',
      doctor: 'Lab Technician',
      location: 'Gombe Central PHC',
      status: 'completed',
      notes: 'Routine blood work',
      reminder: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Next Appointment Card */}
      {upcomingAppointments.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Next Appointment</h2>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{upcomingAppointments[0].type}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{upcomingAppointments[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{upcomingAppointments[0].time}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{upcomingAppointments[0].location}</span>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Appointments</h3>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(appointment.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{appointment.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{appointment.doctor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{appointment.location}</span>
                  </div>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Reminders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700">SMS Reminders</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Voice Call Reminders</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700">WhatsApp Reminders</span>
            <input type="checkbox" className="toggle" />
          </label>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reminder Timing
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="1">1 day before</option>
            <option value="2">2 days before</option>
            <option value="3">3 days before</option>
            <option value="7">1 week before</option>
          </select>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="text-sm text-gray-900">{selectedAppointment.type}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                <p className="text-sm text-gray-900">{selectedAppointment.date} at {selectedAppointment.time}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Healthcare Provider</label>
                <p className="text-sm text-gray-900">{selectedAppointment.doctor}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-sm text-gray-900">{selectedAppointment.location}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <p className="text-sm text-gray-900">{selectedAppointment.notes}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>
            </div>
            
            {selectedAppointment.status === 'upcoming' && (
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Phone className="h-4 w-4 mr-2 inline" />
                  Call Clinic
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};