import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';

function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await fetchNews();
        setNews(data.slice(0, 3)); // Get latest 3 news articles
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    getNews();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 md:py-32 text-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Welcome to Anurag School</h1>
          <p className="text-lg md:text-xl mb-8">Nurturing the leaders of tomorrow.</p>
          <Link to="/admissions" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">A Legacy of Excellence</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            For decades, SriChaitanya has been a beacon of quality education, blending rigorous academics with holistic development. We prepare students not just for exams, but for life.
          </p>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length > 0 ? news.map(article => (
              <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src={article.imageUrl || 'https://placehold.co/600x400/e2e8f0/e2e8f0?text=.'} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{new Date(article.publishDate).toLocaleDateString()}</p>
                  <p className="text-gray-700 line-clamp-3">{article.content}</p>
                </div>
              </div>
            )) : <p>Loading news...</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;