import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  AlertTriangle,
  Download,
  Filter
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('anc');

  const kpiData = [
    { 
      title: 'ANC Attendance Rate', 
      value: '78%', 
      change: '+5%', 
      trend: 'up',
      target: '85%',
      icon: Calendar 
    },
    { 
      title: 'High Risk Cases', 
      value: '23', 
      change: '-8%', 
      trend: 'down',
      target: '<20',
      icon: AlertTriangle 
    },
    { 
      title: 'Insurance Coverage', 
      value: '67%', 
      change: '+12%', 
      trend: 'up',
      target: '80%',
      icon: Users 
    },
    { 
      title: 'Birth Outcomes', 
      value: '94%', 
      change: '+2%', 
      trend: 'up',
      target: '95%',
      icon: TrendingUp 
    }
  ];

  const facilityData = [
    { name: 'Gombe Central PHC', patients: 145, visits: 432, riskCases: 8, attendance: 82 },
    { name: 'Pantami PHC', patients: 123, visits: 389, riskCases: 12, attendance: 75 },
    { name: 'Tudun Wada PHC', patients: 98, visits: 298, riskCases: 6, attendance: 86 },
    { name: 'Nasarawo PHC', patients: 87, visits: 267, riskCases: 4, attendance: 91 },
    { name: 'Bolari PHC', patients: 76, visits: 234, riskCases: 9, attendance: 73 }
  ];

  const lgaData = [
    { name: 'Gombe', patients: 234, facilities: 5, coverage: 78, riskCases: 18 },
    { name: 'Akko', patients: 189, facilities: 4, coverage: 72, riskCases: 15 },
    { name: 'Yamaltu/Deba', patients: 156, facilities: 3, coverage: 68, riskCases: 12 },
    { name: 'Kaltungo', patients: 143, facilities: 4, coverage: 74, riskCases: 9 },
    { name: 'Billiri', patients: 98, facilities: 3, coverage: 65, riskCases: 8 }
  ];

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => {
            const TrendIcon = getTrendIcon(kpi.trend);
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-white rounded-lg">
                    <kpi.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className={`flex items-center text-sm ${getTrendColor(kpi.trend)}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500">Target: {kpi.target}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance by Facility */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance by Facility</h3>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Cases</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facilityData.map((facility, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{facility.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{facility.patients}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{facility.visits}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      facility.riskCases > 10 ? 'bg-red-100 text-red-800' : 
                      facility.riskCases > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {facility.riskCases}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            facility.attendance >= 85 ? 'bg-green-500' : 
                            facility.attendance >= 70 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${facility.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{facility.attendance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LGA Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">LGA Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lgaData.map((lga, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{lga.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patients:</span>
                  <span className="font-medium">{lga.patients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Facilities:</span>
                  <span className="font-medium">{lga.facilities}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-medium">{lga.coverage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Cases:</span>
                  <span className={`font-medium ${
                    lga.riskCases > 15 ? 'text-red-600' : 
                    lga.riskCases > 10 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {lga.riskCases}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ANC Attendance Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Risk analysis chart would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};