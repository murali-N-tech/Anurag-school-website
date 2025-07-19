import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdmissionsList from '../components/admin/AdmissionsList';
import NewsManager from '../components/admin/NewsManager';
import EventManager from '../components/admin/EventManager';
import ContactManager from '../components/admin/ContactManager';

function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('admissions');

  const renderContent = () => {
    switch (activeTab) {
      case 'admissions': return <AdmissionsList />;
      case 'messages': return <ContactManager />;
      case 'news': return <NewsManager />;
      case 'events': return <EventManager />;
      default: return <AdmissionsList />;
    }
  };

  const getButtonClass = (tabName) => `px-4 py-2 text-sm font-medium rounded-md ${activeTab === tabName ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome, {user?.name || 'Admin'}.</p>
      <div className="flex flex-wrap gap-4 mb-8 border-b pb-4">
        <button onClick={() => setActiveTab('admissions')} className={getButtonClass('admissions')}>Admissions</button>
        <button onClick={() => setActiveTab('messages')} className={getButtonClass('messages')}>Messages</button>
        <button onClick={() => setActiveTab('news')} className={getButtonClass('news')}>Add News</button>
        <button onClick={() => setActiveTab('events')} className={getButtonClass('events')}>Add Event</button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
export default AdminDashboard;