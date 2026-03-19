// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/common/SkeletonCard';
import Stack from './Stack'; 
import { ArrowRight } from 'lucide-react';

import AboutPage from './AboutPage';
import AdmissionsPage from './AdmissionsPage';
import EventsPage from './EventsPage';
import Gallery from './Gallery';
import ContactPage from './ContactPage';

function HomePage() {
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const schoolImages = [
    "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912593/WhatsApp_Image_2026-03-19_at_13.33.51_gxn55x.jpg",
    "https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924915/IMG_20250621_070849_cii4ov.jpg",
    "https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924916/IMG_20250228_105144_ckyvjl.jpg",
    "https://res.cloudinary.com/dqdhui9bw/image/upload/v1752941476/WhatsApp_Image_2025-07-19_at_21.40.11_395e5c98_u3wasx.jpg"
  ];

  useEffect(() => {
    const getNews = async () => {
      try {
        setNewsLoading(true);
        const { data } = await fetchNews();
        setNews(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    getNews();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-400 via-blue-200 to-blue-50 bg-fixed overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-[100dvh] flex flex-col lg:flex-row items-center w-full relative">
        
        {/* LEFT: Content Area */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:pl-24 lg:pr-6 py-12 lg:py-20 space-y-4 md:space-y-6 order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-[#1e3a8a] text-white text-[14px] md:text-[20px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-lg w-fit mx-auto lg:mx-0">
            Est. 2018 • Eluru
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#1e3a8a]">
            Nurturing <br />
            <span className="text-blue-600">Young Minds</span> <br />
            <span className="text-[0.8em]">for a Better Tomorrow</span>
          </h1>
          
          <p className="text-base md:text-xl text-black-600 max-w-xl mx-auto lg:mx-0">
            Discover a transformative learning experience at <span className="font-semibold text-blue-700">Anurag EM School</span>.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <a href="#admissions" className="bg-[#1e3a8a] text-white font-black py-3 px-8 md:py-4 md:px-10 rounded-xl md:rounded-2xl hover:bg-blue-800 transition-all shadow-xl uppercase tracking-widest text-[10px] md:text-xs">
              Start Your Journey
            </a>
          </div>
        </div>

        {/* RIGHT: Image Stack Area */}
        <div className="w-full lg:w-[55%] h-[50vh] sm:h-[60vh] lg:h-screen flex items-center justify-center relative order-1 lg:order-2 group mt-8 lg:mt-0">
          <div className="w-[90%] h-[90%] md:w-[85%] md:h-[80%] max-w-[650px] max-h-[800px] relative pb-10 md:pb-20">
            <Stack
              randomRotation={true}
              sensitivity={250}
              sendToBackOnClick={true}
              cards={schoolImages.map((src, i) => (
                <div key={i} className="w-full h-full rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-white">
                  <img src={src} alt={`school-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
              autoplay={true}
              autoplayDelay={2000} 
              pauseOnHover={true}
            />
          </div>
          {/* Mobile Tap Indicator */}
          <div className="absolute bottom-4 lg:bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a] opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-all shadow-xl">
             <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Tap to Flip</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTIONS */}
      <main className="max-w-[1500px] mx-auto space-y-16 md:space-y-32 py-16 md:py-32 px-4 md:px-6">
        <section id="about" className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-white/60 shadow-2xl">
          <AboutPage />
        </section>
        <section id="gallery" className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-white/60 shadow-2xl">
          <Gallery />
        </section>
        <section id="admissions" className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-white/60 shadow-2xl">
          <AdmissionsPage />
        </section>
        <section id="events" className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-white/60 shadow-2xl">
          <EventsPage />
        </section>

        {/* 3. LATEST NEWS SECTION */}
        <section id="news" className="text-center px-2">
          <div className="flex flex-col items-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-[#1e3a8a]">Feed</h2>
            <div className="w-16 md:w-24 h-1.5 md:h-2 bg-blue-600 rounded-full mt-2 md:mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {!newsLoading && news.map(article => (
              <div key={article._id} className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/60 text-left">
                <div className="h-48 md:h-72 overflow-hidden">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-10">
                  <h3 className="text-xl md:text-3xl font-black uppercase text-[#1e3a8a] mb-4 line-clamp-2">{article.title}</h3>
                  <Link to={`/news/${article._id}`} className="inline-flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] md:text-xs">
                    Read Full Story <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
            {newsLoading && [...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>

        <section id="contactpage" className="backdrop-blur-3xl bg-white/40 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-white/60 shadow-2xl">
          <ContactPage />
        </section>
      </main>
    </div>
  );
}

export default HomePage;