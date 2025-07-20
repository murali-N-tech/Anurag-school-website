import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';
import SkeletonCard from '../components/common/SkeletonCard'; // Import the skeleton component

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Theme Colors for consistency ---
  const boneColor = '#E3DAC9';
  const darkBrown = '#4E2A0D';

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getEvents();
  }, []);

  // --- Reusable Section Heading for consistent styling ---
  const SectionHeading = ({ children }) => (
    <h2
      className="text-3xl sm:text-4xl font-extrabold mb-12 py-3 px-6 inline-block rounded-md shadow-lg"
      style={{ backgroundColor: darkBrown, color: 'white' }}
    >
      {children}
    </h2>
  );

  return (
    <div style={{ backgroundColor: boneColor }} className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading>Upcoming Events</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            // If loading, display 6 skeleton placeholders
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : events.length > 0 ? (
            // If loading is complete and events exist, display them
            events.map(event => (
              <div key={event._id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-transform duration-300 border border-gray-100">
                <img src={event.imageUrl || 'https://placehold.co/600x400/E2DAC9/4E2A0D?text=Event'} alt={event.title} className="w-full h-52 object-cover" />
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-2 font-medium">
                    <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-gray-500 text-sm mb-4 font-medium">
                    <span className="font-semibold">Location:</span> {event.location || 'To be announced'}
                  </p>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))
          ) : (
            // If loading is complete and there are no events, show a message
            <p className="text-center text-gray-600 col-span-full text-lg">There are no upcoming events at this time. Please check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
