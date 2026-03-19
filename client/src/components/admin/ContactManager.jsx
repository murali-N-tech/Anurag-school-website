import React, { useState, useEffect } from 'react';
import { getContactMessages, deleteContactMessage } from '../../services/api';

function ContactManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        // Refresh the list after deleting
        fetchMessages();
      } catch (error) {
        console.error("Failed to delete message:", error);
        alert('Could not delete the message.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contact Form Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="space-y-4">
          {messages.length > 0 ? messages.map(msg => (
            <div key={msg._id} className="border p-4 rounded-md bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">{msg.subject}</p>
                  <p className="text-sm text-gray-600">From: {msg.name} ({msg.email})</p>
                  <p className="text-xs text-gray-400">Received: {new Date(msg.submittedAt).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </div>
              <p className="mt-2 text-gray-800">{msg.message}</p>
            </div>
          )) : (
            <p className="text-center text-gray-500">No messages found.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default ContactManager;