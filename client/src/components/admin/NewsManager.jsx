import React, { useState } from 'react';
import { createNews } from '../../services/api';

function NewsManager() {
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNews(formData);
      setMessage('News article created successfully!');
      setIsError(false);
      setFormData({ title: '', content: '', imageUrl: '' });
    } catch (error) {
      setMessage('Failed to create news article.');
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea name="content" rows="5" value={formData.content} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Publish Article</button>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default NewsManager;