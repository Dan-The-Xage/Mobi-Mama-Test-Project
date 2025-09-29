import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Calendar, 
  Globe,
  Volume2,
  Mail,
  Smartphone,
  Filter,
  Search
} from 'lucide-react';

export const MessageCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'templates' | 'history'>('broadcast');
  const [messageType, setMessageType] = useState<'sms' | 'voice' | 'whatsapp'>('sms');

  const messageTemplates = [
    {
      id: 1,
      title: 'ANC Appointment Reminder',
      content: 'Dear {name}, your ANC appointment is scheduled for {date} at {time}. Please come to the clinic.',
      language: 'English',
      type: 'appointment',
      usage: 245
    },
    {
      id: 2,
      title: 'Hausa ANC Reminder',
      content: 'Matukarce {name}, ranar dubawa ta ANC {date} da karfe {time}. Don Allah zo asibitin.',
      language: 'Hausa',
      type: 'appointment',
      usage: 189
    },
    {
      id: 3,
      title: 'Health Education - Nutrition',
      content: 'Remember to eat nutritious foods including fruits, vegetables, and proteins for a healthy pregnancy.',
      language: 'English',
      type: 'education',
      usage: 156
    },
    {
      id: 4,
      title: 'Emergency Alert',
      content: 'If you experience severe headache, bleeding, or difficulty breathing, contact emergency services immediately.',
      language: 'English',
      type: 'emergency',
      usage: 23
    }
  ];

  const messageHistory = [
    {
      id: 1,
      type: 'sms',
      recipient: 'All Active Patients',
      count: 234,
      subject: 'Weekly Health Tips',
      status: 'sent',
      sentDate: '2024-01-15 14:30:00',
      deliveryRate: 96
    },
    {
      id: 2,
      type: 'voice',
      recipient: 'High Risk Patients',
      count: 45,
      subject: 'ANC Appointment Reminder',
      status: 'delivered',
      sentDate: '2024-01-15 10:15:00',
      deliveryRate: 91
    },
    {
      id: 3,
      type: 'whatsapp',
      recipient: 'Insurance Eligible',
      count: 78,
      subject: 'Insurance Enrollment',
      status: 'pending',
      sentDate: '2024-01-15 09:00:00',
      deliveryRate: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <Mail className="h-4 w-4" />;
      case 'voice':
        return <Volume2 className="h-4 w-4" />;
      case 'whatsapp':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivery Rate</p>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Recipients</p>
              <p className="text-2xl font-bold text-purple-600">456</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Templates</p>
              <p className="text-2xl font-bold text-orange-600">{messageTemplates.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Message Center</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'broadcast'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Send className="h-4 w-4 mr-2 inline" />
              Broadcast
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Globe className="h-4 w-4 mr-2 inline" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2 inline" />
              History
            </button>
          </div>
        </div>

        {activeTab === 'broadcast' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMessageType('sms')}
                    className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                      messageType === 'sms'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    SMS
                  </button>
                  <button
                    onClick={() => setMessageType('voice')}
                    className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                      messageType === 'voice'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Voice
                  </button>
                  <button
                    onClick={() => setMessageType('whatsapp')}
                    className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                      messageType === 'whatsapp'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipients
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Active Patients</option>
                  <option value="highrisk">High Risk Patients</option>
                  <option value="appointments">Upcoming Appointments</option>
                  <option value="insurance">Insurance Eligible</option>
                  <option value="overdue">Overdue Visits</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="hausa">Hausa</option>
                  <option value="fulfulde">Fulfulde</option>
                  <option value="kanuri">Kanuri</option>
                  <option value="english">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template (Optional)
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select template...</option>
                  {messageTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here. You can use variables like {name}, {date}, {time}..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Available variables: {'{name}'}, {'{date}'}, {'{time}'}, {'{location}'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Schedule for later</span>
              </label>
              <input
                type="datetime-local"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Template
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messageTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{template.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      template.type === 'appointment' ? 'bg-blue-100 text-blue-800' :
                      template.type === 'education' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{template.language}</span>
                    <span>Used {template.usage} times</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search message history..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messageHistory.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {getMessageIcon(message.type)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">{message.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{message.subject}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{message.recipient}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{message.count}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{message.sentDate}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {message.deliveryRate > 0 ? `${message.deliveryRate}%` : 'Pending'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};