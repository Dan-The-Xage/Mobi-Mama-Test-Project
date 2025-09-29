import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Download, 
  Heart,
  Baby,
  Utensils,
  Activity,
  Shield,
  Search,
  Filter
} from 'lucide-react';

export const HealthEducation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'exercise', name: 'Exercise', icon: Activity },
    { id: 'prenatal', name: 'Prenatal Care', icon: Heart },
    { id: 'baby', name: 'Baby Care', icon: Baby },
    { id: 'safety', name: 'Safety', icon: Shield },
  ];

  const educationContent = [
    {
      id: 1,
      title: 'Healthy Eating During Pregnancy',
      category: 'nutrition',
      type: 'article',
      language: 'English',
      duration: '5 min read',
      content: 'Learn about essential nutrients for a healthy pregnancy...',
      week: 'Week 16',
      featured: true
    },
    {
      id: 2,
      title: 'Cin Abinci Mai Gina Jiki A Lokacin Daukar Ciki',
      category: 'nutrition',
      type: 'audio',
      language: 'Hausa',
      duration: '8 min',
      content: 'Koyi game da muhimman abubuwan gina jiki...',
      week: 'Week 16',
      featured: true
    },
    {
      id: 3,
      title: 'Safe Exercise During Pregnancy',
      category: 'exercise',
      type: 'video',
      language: 'English',
      duration: '10 min',
      content: 'Gentle exercises that are safe during pregnancy...',
      week: 'Week 16',
      featured: false
    },
    {
      id: 4,
      title: 'Preparing for Your Baby\'s Arrival',
      category: 'baby',
      type: 'article',
      language: 'English',
      duration: '7 min read',
      content: 'Essential items and preparations for your newborn...',
      week: 'Week 36',
      featured: false
    },
    {
      id: 5,
      title: 'Recognizing Warning Signs',
      category: 'safety',
      type: 'article',
      language: 'English',
      duration: '4 min read',
      content: 'Important symptoms to watch for during pregnancy...',
      week: 'All weeks',
      featured: false
    },
    {
      id: 6,
      title: 'Antenatal Care Visits',
      category: 'prenatal',
      type: 'article',
      language: 'English',
      duration: '6 min read',
      content: 'What to expect during your ANC visits...',
      week: 'All weeks',
      featured: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'audio':
        return <Play className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'audio':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredContent = educationContent.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredContent = educationContent.filter(item => item.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Education</h2>
        <p className="text-gray-600">Access helpful information and tips for a healthy pregnancy</p>
      </div>

      {/* Featured Content */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Featured This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredContent.map((item) => (
            <div key={item.id} className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.week}</span>
                <div className="flex items-center space-x-1">
                  {getTypeIcon(item.type)}
                  <span className="text-sm">{item.duration}</span>
                </div>
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-100 mb-3">{item.content}</p>
              <button className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search health topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  <span className="ml-1">{item.type}</span>
                </span>
                <span className="text-xs text-gray-500">{item.week}</span>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{item.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{item.language}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{item.duration}</span>
                </div>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips for Week 16</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">Continue taking prenatal vitamins daily</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">Stay hydrated - drink at least 8 glasses of water daily</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">Get adequate rest and avoid stress</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">Attend all scheduled ANC visits</p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download for Offline Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Pregnancy Guide (English)</p>
              <p className="text-xs text-gray-500">Complete guide • 2.5 MB</p>
            </div>
            <button className="flex items-center text-green-600 hover:text-green-700">
              <Download className="h-4 w-4 mr-1" />
              <span className="text-sm">Download</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Jagorar Daukar Ciki (Hausa)</p>
              <p className="text-xs text-gray-500">Cikakken jagora • 2.8 MB</p>
            </div>
            <button className="flex items-center text-green-600 hover:text-green-700">
              <Download className="h-4 w-4 mr-1" />
              <span className="text-sm">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};