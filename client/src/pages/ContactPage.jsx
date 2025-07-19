import React, { useState } from 'react';
import { createContactMessage } from '../services/api'; // We will add this to api.js

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ message: '', isError: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContactMessage(formData);
      setStatus({ message: 'Thank you! Your message has been sent.', isError: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ message: 'An error occurred. Please try again.', isError: true });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Get In Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <button type="submit" className="w-full py-3 px-4 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Send Message</button>
          </form>
          {status.message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {status.message}
            </div>
          )}
        </div>

        {/* Contact Details & Map */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-2"><strong>Address:</strong> 54-15-20, Sri Chaitanya College Road, Tikkle Road, Labbipet, Vijayawada, Andhra Pradesh 520010</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 123 456 7890</p>
            <p className="text-gray-600"><strong>Email:</strong> contact@srichaitanya.school</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.49503947844!2d80.6439973148641!3d16.50193498861614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb4a0aaaaaab%3A0xbd16283067ce3b6!2sSri%20Chaitanya%20Junior%20College!5e0!3m2!1sen!2sin!4v1626872960098!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;