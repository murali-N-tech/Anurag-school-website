import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/common/SkeletonCard';
import Stack from './Stack'; 
import { MousePointer2, ArrowRight } from 'lucide-react';

// Import sections
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
      
      {/* 1. HERO SECTION: Clean Split Layout */}
      <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center w-full relative">
        
        {/* LEFT: Content Area */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-8 md:px-16 lg:pl-24 lg:pr-6 py-20 space-y-6 order-2 lg:order-1">
          <div className="inline-block px-4 py-1 rounded-full bg-[#1e3a8a] text-white text-[20px] font-black uppercase tracking-[0.3em] shadow-lg w-fit">
            Est. 2018 • Eluru
          </div>
          
          <h1 className="text-5xl md:text-7xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-[#1e3a8a]">
            Nurturing <br />
            <span className="text-blue-600">Young Minds</span> <br />
            for a Better Tomorrow
          </h1>
          
          <p className="text-lg md:text-xl text-black-600 max-w-xl">
  Discover a transformative learning experience at <span className="font-semibold text-blue-700">Anurag EM School</span>, where young minds grow, explore, and excel.
</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#admissions" className="bg-[#1e3a8a] text-white font-black py-4 px-10 rounded-2xl hover:bg-blue-800 transition-all shadow-xl uppercase tracking-widest text-xs">
              Start Your Journey
            </a>
           
          </div>
        </div>

        {/* RIGHT: Image Stack Area (Transparent Background) */}
        <div className="w-full lg:w-[55%] h-[70vh] lg:h-screen flex items-center justify-center relative order-1 lg:order-2 group">
          
          {/* THE STACK COMPONENT */}
          <div className="w-[85%] h-[80%] max-w-[650px] max-h-[800px] relative pb-20">
            <Stack
              randomRotation={true}
              sensitivity={250}
              sendToBackOnClick={true}
              cards={schoolImages.map((src, i) => (
                <div key={i} className="w-full h-full rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] bg-white">
                  <img 
                    src={src} 
                    alt={`school-stack-${i}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
              autoplay={true}
              autoplayDelay={2000} 
              pauseOnHover={true}
            />
          </div>

          {/* TAP VISUALIZATION: Sleek bottom pill */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1e3a8a]/100 backdrop-blur-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
            <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center animate-ping">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Tap</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTIONS */}
      <main className="max-w-[1500px] mx-auto space-y-32 py-32 px-6">
        
        <section id="about" className="backdrop-blur-3xl bg-white/40 rounded-[4rem] p-10 md:p-20 border border-white/60 shadow-2xl transition-transform hover:scale-[1.01] duration-700">
          <AboutPage />
        </section>
        <section id="gallery" className="backdrop-blur-3xl bg-white/40 rounded-[4rem] p-10 md:p-20 border border-white/60 shadow-2xl transition-all hover:scale-[1.01] duration-700">
          <Gallery />
        </section>

        <section id="admissions" className="backdrop-blur-3xl bg-white/40 rounded-[4rem] p-10 md:p-20 border border-white/60 shadow-2xl">
          <AdmissionsPage />
        </section>

        <section id="events" className="backdrop-blur-3xl bg-white/40 rounded-[4rem] p-10 md:p-20 border border-white/60 shadow-2xl">
          <EventsPage />
        </section>

        {/* 3. LATEST NEWS SECTION */}
        <section id="news" className="text-center">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[#1e3a8a]">
              Feed
            </h2>
            <div className="w-24 h-2 bg-blue-600 rounded-full mt-4"></div>
          </div>
         

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {!newsLoading && news.map(article => (
              <div key={article._id} className="group bg-white/50 backdrop-blur-xl rounded-[3.5rem] overflow-hidden border border-white/60 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-500 text-left">
                <div className="h-72 overflow-hidden relative">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black uppercase text-[#1e3a8a] mb-6 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <Link to={`/news/${article._id}`} className="inline-flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                    Read Full Story <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
            {newsLoading && [...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
          <section id="contactpage" className="backdrop-blur-3xl bg-white/40 rounded-[4rem] p-10 md:p-20 border border-white/60 shadow-2xl">
          <ContactPage />
        </section>
      </main>
    </div>
  );
}

export default HomePage;