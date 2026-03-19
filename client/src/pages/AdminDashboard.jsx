import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Newspaper, 
  Calendar, 
  UserPlus, 
  MessageSquare,
  LogOut,
  Settings
} from 'lucide-react';

// Components
import AdmissionsList from '../components/admin/AdmissionsList';
import NewsManager from '../components/admin/NewsManager';
import EventManager from '../components/admin/EventManager';
import ContactManager from '../components/admin/ContactManager';
import AdminGallery from './AdminGallery'; // The new component we built

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('admissions');

  const menuItems = [
    { id: 'admissions', label: 'Admissions', icon: <UserPlus size={20} /> },
    { id: 'gallery', label: 'Gallery Manager', icon: <ImageIcon size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'news', label: 'News Updates', icon: <Newspaper size={20} /> },
    { id: 'events', label: 'Events Manager', icon: <Calendar size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'admissions': return <AdmissionsList />;
      case 'gallery': return <AdminGallery />;
      case 'messages': return <ContactManager />;
      case 'news': return <NewsManager />;
      case 'events': return <EventManager />;
      default: return <AdmissionsList />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-[#1e3a8a] text-white flex flex-col fixed h-full shadow-2xl z-50">
        <div className="p-10">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Anurag <span className="text-blue-400">Admin</span>
          </h2>
        </div>

        <nav className="flex-grow px-6 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black uppercase text-[10px] tracking-[0.2em] ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl scale-105' 
                : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-8 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-5 py-4 w-full text-red-300 hover:text-red-100 transition-colors font-black uppercase text-[10px] tracking-[0.2em]"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow ml-72 p-10 lg:p-16">
        
        {/* TOP HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-blue-950 uppercase tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-blue-900/40 text-sm font-bold uppercase tracking-widest mt-1">
              Welcome back, {user?.name || 'Administrator'}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-4 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-blue-600 transition-all border border-gray-100">
              <Settings size={22} />
            </button>
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-950 hidden md:block">
                Status: Online
              </span>
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT BOX */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-gray-100 min-h-[75vh]">
          {renderContent()}
        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;