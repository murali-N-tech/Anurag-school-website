import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
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
    // Apply the Bone background color using arbitrary value syntax
    <div className="container mx-auto px-4 py-12 bg-[#E3DAC9]">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Upcoming Events</h1>
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {events.length > 0 ? events.map(event => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-center md:text-left md:w-1/4">
                <p className="text-2xl font-bold text-blue-600">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}</p>
                <p className="text-lg text-gray-700">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                <p className="text-sm text-gray-500">{new Date(event.date).getFullYear()}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6 flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">Location: {event.location}</p>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-600">No upcoming events at this time. Please check back later.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EventsPage;