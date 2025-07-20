import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from '../services/api'; // Make sure this function exists in your api.js

function NewsDetailPage() {
  // State for the article, loading status, and any errors
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // This hook gets the article 'id' from the URL

  // --- Theme Colors (for consistency with your homepage) ---
  const boneColor = '#E3DAC9';
  const darkBrown = '#4E2A0D';

  // This effect runs when the component loads or the 'id' in the URL changes
  useEffect(() => {
    const getArticle = async () => {
      if (!id) {
        setLoading(false);
        setError('No article ID was found in the URL.');
        return;
      }
      try {
        setLoading(true);
        // Fetch the specific article using its ID
        const { data } = await fetchNewsById(id);
        setArticle(data);
        setError('');
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError('Failed to load the article. It might not exist or there was a server error.');
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  // --- Conditional Rendering ---

  // Show a loading message while fetching data
  if (loading) {
    return (
      <div style={{ backgroundColor: boneColor }} className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-gray-700">Loading article...</p>
      </div>
    );
  }

  // Show an error message if the API call fails
  if (error) {
    return (
      <div style={{ backgroundColor: boneColor }} className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-red-600 bg-red-100 p-4 rounded-lg shadow-md">{error}</p>
      </div>
    );
  }

  // Show a message if the article wasn't found
  if (!article) {
    return (
      <div style={{ backgroundColor: boneColor }} className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-gray-700">Sorry, this article could not be found.</p>
      </div>
    );
  }

  // --- Main Component Render ---
  // This is displayed once the article data is successfully loaded
  return (
    <div style={{ backgroundColor: boneColor }} className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          )}
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: darkBrown }}>
              {article.title}
            </h1>
            <p className="text-gray-500 font-medium mb-8">
              Published on {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {/* The 'whitespace-pre-wrap' class preserves newlines from your database content */}
            <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailPage;
