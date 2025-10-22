import React, { useState } from 'react';
import DashboardNavbar from '../Components/DashboardNavbar';

const HelpService = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: '',
    attachments: []
  });

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I start using the AI Rockfall Prediction System?',
          a: 'Begin by logging into your account, then navigate to the Sites page to add your first monitoring location. Upload geological data and configure sensors to start receiving predictions.'
        },
        {
          q: 'What data formats are supported for geological information?',
          a: 'We support CSV, Excel (.xlsx), GeoJSON, and KML formats. For sensor data, we accept JSON, XML, and direct API connections from major sensor manufacturers.'
        },
        {
          q: 'How accurate are the AI predictions?',
          a: 'Our AI models achieve 92-96% accuracy depending on data quality and site conditions. Accuracy improves over time as the system learns from your specific site patterns.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'Why are my sensor readings not updating?',
          a: 'Check your internet connection, verify sensor power supply, and ensure your API credentials are correct. If issues persist, contact technical support.'
        },
        {
          q: 'How do I interpret prediction confidence levels?',
          a: 'Confidence levels range from 0-100%. Values above 80% indicate high reliability, 60-80% moderate reliability, and below 60% require additional data validation.'
        },
        {
          q: 'Can I export prediction reports?',
          a: 'Yes, reports can be exported in PDF, Excel, and JSON formats from the Reports page. You can schedule automated reports to be sent via email.'
        }
      ]
    },
    {
      category: 'Account & Billing',
      questions: [
        {
          q: 'How do I upgrade my subscription plan?',
          a: 'Go to Settings > Billing to view available plans and upgrade options. Changes take effect immediately, and you\'ll be prorated for the current billing period.'
        },
        {
          q: 'What happens if I exceed my data limits?',
          a: 'You\'ll receive notifications at 80% and 95% usage. After reaching 100%, data collection continues but may be throttled. Upgrade your plan for unlimited access.'
        },
        {
          q: 'How do I add team members to my account?',
          a: 'Navigate to Settings > Team Management to invite users via email. Set their permissions level (Viewer, Analyst, or Admin) based on their role requirements.'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      action: 'Start Chat',
      status: 'online'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 8AM-6PM PST',
      action: 'Call Now',
      phone: '+1 (555) 123-4567'
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us detailed questions or issues',
      availability: 'Response within 4 hours',
      action: 'Send Email',
      email: 'support@rockfallai.com'
    },
    {
      icon: '🎥',
      title: 'Video Call',
      description: 'Schedule a screen-sharing session',
      availability: 'By appointment',
      action: 'Schedule Call',
      status: 'available'
    }
  ];

  const resourceCategories = [
    {
      title: 'Video Tutorials',
      icon: '🎬',
      resources: [
        'Getting Started Guide (15 min)',
        'Setting Up Sensors (8 min)',
        'Understanding Predictions (12 min)',
        'Advanced Analytics (20 min)'
      ]
    },
    {
      title: 'Documentation',
      icon: '📚',
      resources: [
        'API Reference Guide',
        'User Manual PDF',
        'Sensor Configuration Guide',
        'Best Practices Handbook'
      ]
    },
    {
      title: 'Community',
      icon: '👥',
      resources: [
        'User Forum',
        'Expert Webinars',
        'Case Studies',
        'Feature Requests'
      ]
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission
    alert('Support ticket submitted successfully! We\'ll respond within 4 hours.');
    setTicketForm({
      subject: '',
      category: 'technical',
      priority: 'medium',
      description: '',
      attachments: []
    });
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">{category.category}</h3>
          </div>
          <div className="p-6 space-y-4">
            {category.questions
              .filter(item => 
                searchQuery === '' || 
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">{item.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-8">
      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels.map((channel, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{channel.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
                  {channel.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      channel.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {channel.status}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{channel.description}</p>
                <p className="text-sm text-gray-500 mb-4">Available: {channel.availability}</p>
                {channel.phone && (
                  <p className="text-sm font-medium text-blue-600 mb-3">{channel.phone}</p>
                )}
                {channel.email && (
                  <p className="text-sm font-medium text-blue-600 mb-3">{channel.email}</p>
                )}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {channel.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Ticket Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Submit a Support Ticket</h3>
        <form onSubmit={handleTicketSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing & Account</option>
                <option value="feature">Feature Request</option>
                <option value="general">General Question</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high', 'urgent'].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={ticketForm.priority === priority}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="mr-2"
                  />
                  <span className="capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={ticketForm.description}
              onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please describe your issue in detail..."
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-gray-400 mb-2">📎</div>
              <p className="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
              <input type="file" multiple className="hidden" />
              <button type="button" className="text-blue-600 text-sm hover:underline">
                Choose Files
              </button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {resourceCategories.map((category, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {category.resources.map((resource, resourceIndex) => (
                <li key={resourceIndex}>
                  <button className="text-left w-full p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                    {resource}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const sections = [
    { id: 'faq', name: 'FAQ', icon: '❓' },
    { id: 'support', name: 'Contact Support', icon: '🎧' },
    { id: 'resources', name: 'Resources', icon: '📖' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'faq': return renderFAQ();
      case 'support': return renderSupport();
      case 'resources': return renderResources();
      default: return renderFAQ();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the help you need to make the most of your AI Rockfall Prediction System
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl text-blue-600 mb-2">⚡</div>
            <div className="text-2xl font-bold text-gray-900">&lt; 4hrs</div>
            <div className="text-sm text-gray-600">Average Response Time</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl text-green-600 mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-900">98.5%</div>
            <div className="text-sm text-gray-600">Issue Resolution Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl text-purple-600 mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-2xl text-orange-600 mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-900">200+</div>
            <div className="text-sm text-gray-600">Help Articles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpService;