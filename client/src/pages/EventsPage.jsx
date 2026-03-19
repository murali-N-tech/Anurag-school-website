import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';
import SkeletonCard from '../components/common/SkeletonCard';
import { Calendar, MapPin } from 'lucide-react'; // Modern icons for details

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Theme Colors matching the new Blue palette ---
  const deepBlue = '#1e3a8a';

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const { data } = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Modern Section Heading */}
        <h2 
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 inline-block pb-4 border-b-4"
          style={{ color: deepBlue, borderColor: deepBlue }}
        >
           Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : events.length > 0 ? (
            events.map(event => (
              <div 
                key={event._id} 
                className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-3 transition-all duration-500 border border-white/60 group"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={event.imageUrl || 'https://placehold.co/600x400/1e3a8a/ffffff?text=Event'} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-lg">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">
                      School Event
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 text-left">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight" style={{ color: deepBlue }}>
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <p className="flex items-center gap-3 text-sm font-bold opacity-80" style={{ color: deepBlue }}>
                      <Calendar size={18} className="text-blue-500" />
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="flex items-center gap-3 text-sm font-bold opacity-80" style={{ color: deepBlue }}>
                      <MapPin size={18} className="text-blue-500" />
                      {event.location || 'Anurag EM School Campus'}
                    </p>
                  </div>

                  <p className="text-blue-900/70 leading-relaxed font-medium line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40">
              <p className="text-[#1e3a8a] font-black uppercase tracking-widest text-lg">
                No events scheduled at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;