import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Or your preferred icons

function HomePage() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Slideshow Data ---
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924907/generated-image-3_gncgs3.png',
      title: 'Welcome to Anurag School',
      subtitle: 'Nurturing the leaders of tomorrow.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924915/IMG_20250621_070849_cii4ov.jpg',
      title: 'Yoga and Wellness',
      subtitle: 'To make every student a healthy and happy individual.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924916/IMG_20250228_105144_ckyvjl.jpg',
      title: 'Innovate and Inspire',
      subtitle: 'Fostering a passion for science and technology.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752941476/WhatsApp_Image_2025-07-19_at_21.40.11_395e5c98_u3wasx.jpg',
      title: 'Celebrating Success',
      subtitle: 'Preparing students for a bright future.',
    },
  ];

  // --- Slideshow Logic ---
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    // Auto-play functionality
    const sliderInterval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    // Fetch news data
    const getNews = async () => {
      try {
        const { data } = await fetchNews();
        setNews(data.slice(0, 3)); // Get latest 3 news articles
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    getNews();

    // Cleanup interval on component unmount
    return () => clearInterval(sliderInterval);
  }, [currentIndex]); 

  return (
    <div>
      {/* Hero Slideshow Section - MODIFIED FOR FULL VIEW */}
      <section className="h-[60vh] md:h-[80vh] w-full relative group">
        {/* Slide Content */}
        <div
          style={{ backgroundImage: `url(${banners[currentIndex].imageUrl})` }}
          // MODIFIED: Removed rounded-2xl
          className="w-full h-full bg-center bg-cover duration-500"
        >
          {/* Overlay - MODIFIED: Removed rounded-2xl */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          {/* Text and Button */}
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              {banners[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {banners[currentIndex].subtitle}
            </p>
            <Link to="/admissions" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ChevronLeft onClick={goToPrevious} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <ChevronRight onClick={goToNext} size={30} />
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center py-2">
          {banners.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer text-2xl mx-1 ${currentIndex === slideIndex ? 'text-white' : 'text-white/50'}`}
            >
              ●
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">A Legacy of Excellence</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            For decades, Anurag School has been a beacon of quality education, blending rigorous academics with holistic development. We prepare students not just for exams, but for life.
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