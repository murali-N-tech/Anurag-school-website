import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsById } from '../services/api'; 
import { ArrowLeft, Calendar, Clock } from 'lucide-react'; // Added for better UI

function NewsDetailPage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  const textColor = '#1e3a8a'; // Deep blue for text contrast

  useEffect(() => {
    const getArticle = async () => {
      if (!id) {
        setLoading(false);
        setError('No article ID was found in the URL.');
        return;
      }
      try {
        setLoading(true);
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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-200 to-blue-50 flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-2xl font-black uppercase tracking-tighter text-blue-900">
           Article...
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-200 to-blue-50 flex flex-col justify-center items-center min-h-screen px-4">
        <p className="text-xl text-red-700 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
          {error || "Sorry, this article could not be found."}
        </p>
        <Link to="/" className="mt-8 text-blue-900 font-black uppercase tracking-widest hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-200 to-blue-50 min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-900 font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={20} />
            Back to News
          </Link>
        </div>

        {/* Article Card */}
        <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          {article.imageUrl && (
            <div className="relative h-64 sm:h-[500px] w-full">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}
          
          <div className="p-8 sm:p-12 relative">
            {/* Date Tag */}
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-widest mb-6">
              <Calendar size={16} />
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-blue-950">
              {article.title}
            </h1>

            {/* Content area with improved typography */}
            <div className="prose lg:prose-2xl max-w-none text-blue-900 leading-relaxed whitespace-pre-wrap font-medium">
              {article.content}
            </div>

            {/* Bottom Decoration */}
            <div className="mt-12 pt-8 border-t border-blue-900/10 flex justify-between items-center">
              <span className="text-blue-900/50 font-black uppercase text-xs tracking-[0.2em]">
                Anurag EM School News
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetailPage;