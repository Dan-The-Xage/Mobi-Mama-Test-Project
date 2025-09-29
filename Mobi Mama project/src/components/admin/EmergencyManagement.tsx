import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle,
  User,
  Activity,
  MessageSquare,
  Truck
} from 'lucide-react';

export const EmergencyManagement: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [responseModal, setResponseModal] = useState(false);

  const emergencyAlerts = [
    {
      id: 1,
      patientName: 'Fatima Ibrahim',
      patientId: '001',
      phone: '08012345678',
      location: 'Gombe Central Ward',
      alertType: 'Severe Bleeding',
      severity: 'high',
      status: 'active',
      timestamp: '2024-01-15 14:30:00',
      description: 'Patient reports heavy bleeding after delivery',
      vitals: {
        bloodPressure: '90/60',
        heartRate: '110',
        temperature: '37.8'
      },
      emergencyContact: '08098765432',
      distance: '2.5 km',
      estimatedArrival: '15 mins'
    },
    {
      id: 2,
      patientName: 'Aisha Mohammed',
      patientId: '002',
      phone: '08087654321',
      location: 'Pantami Ward',
      alertType: 'Severe Headache',
      severity: 'medium',
      status: 'responded',
      timestamp: '2024-01-15 13:45:00',
      description: 'Patient experiencing severe headache with vision problems',
      vitals: {
        bloodPressure: '160/100',
        heartRate: '95',
        temperature: '36.9'
      },
      emergencyContact: '08012345678',
      distance: '4.2 km',
      estimatedArrival: '25 mins'
    },
    {
      id: 3,
      patientName: 'Hadiza Suleiman',
      patientId: '003',
      phone: '08098765432',
      location: 'Tudun Wada',
      alertType: 'Difficulty Breathing',
      severity: 'high',
      status: 'resolved',
      timestamp: '2024-01-15 12:20:00',
      description: 'Patient having difficulty breathing and chest pain',
      vitals: {
        bloodPressure: '140/90',
        heartRate: '120',
        temperature: '38.1'
      },
      emergencyContact: '08076543210',
      distance: '1.8 km',
      estimatedArrival: '12 mins'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'responded':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'responded':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const activeAlerts = emergencyAlerts.filter(alert => alert.status === 'active').length;
  const respondedAlerts = emergencyAlerts.filter(alert => alert.status === 'responded').length;
  const resolvedAlerts = emergencyAlerts.filter(alert => alert.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Emergency Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{activeAlerts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Responded</p>
              <p className="text-2xl font-bold text-yellow-600">{respondedAlerts}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{resolvedAlerts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Emergency Alerts</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live monitoring active</span>
          </div>
        </div>

        {/* Emergency Alerts List */}
        <div className="space-y-4">
          {emergencyAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(alert.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{alert.patientName}</h3>
                    <p className="text-sm text-gray-600">ID: {alert.patientId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{alert.alertType}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{alert.timestamp}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setResponseModal(true)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert Details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{alert.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{alert.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">ETA: {alert.estimatedArrival}</span>
                </div>
              </div>

              {/* Vitals */}
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Vitals</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">BP:</span>
                    <span className="ml-1 font-medium">{alert.vitals.bloodPressure}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">HR:</span>
                    <span className="ml-1 font-medium">{alert.vitals.heartRate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Temp:</span>
                    <span className="ml-1 font-medium">{alert.vitals.temperature}°C</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient</label>
                    <p className="text-sm text-gray-900">{selectedAlert.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Alert Type</label>
                    <p className="text-sm text-gray-900">{selectedAlert.alertType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900">{selectedAlert.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Distance</label>
                    <p className="text-sm text-gray-900">{selectedAlert.distance}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedAlert.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Phone</label>
                    <p className="text-sm text-gray-900">{selectedAlert.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <p className="text-sm text-gray-900">{selectedAlert.emergencyContact}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Vitals</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Blood Pressure:</span>
                      <p className="font-medium">{selectedAlert.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Heart Rate:</span>
                      <p className="font-medium">{selectedAlert.vitals.heartRate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Temperature:</span>
                      <p className="font-medium">{selectedAlert.vitals.temperature}°C</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Phone className="h-4 w-4 mr-2 inline" />
                    Call Patient
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Truck className="h-4 w-4 mr-2 inline" />
                    Dispatch Ambulance
                  </button>
                  <button className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                    <User className="h-4 w-4 mr-2 inline" />
                    Contact Emergency
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response Modal */}
        {responseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Response</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="ambulance">Dispatch Ambulance</option>
                    <option value="call">Call Patient</option>
                    <option value="contact">Contact Emergency Contact</option>
                    <option value="refer">Refer to Hospital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned To
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="callcenter">Call Center</option>
                    <option value="ambulance">Ambulance Service</option>
                    <option value="moh">MoH Response Team</option>
                    <option value="phc">PHC Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add response notes..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setResponseModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setResponseModal(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};