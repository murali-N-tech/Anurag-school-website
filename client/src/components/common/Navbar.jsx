import React, { useState, useEffect } from 'react';
import PillNav from './PillNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold to change the appearance of the sticky bar (e.g., add background)
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundGradient = {
    background: 'linear-gradient(104deg,rgba(48, 83, 112, 1) 0%, rgba(35, 84, 168, 1) 53%)'
  };

  const textColor = '#f2f2f2ff';

  return (
    <>
      {/* SECTION 1: Scrolling Header (Logo & Title) */}
      {/* This part does NOT have sticky, so it will scroll up naturally */}
      <header style={backgroundGradient} className="w-full pt-8 pb-4">
        <div className="max-w-[1920px] mx-auto px-12 flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#home">
              <img 
                src="https://res.cloudinary.com/ddgfjerss/image/upload/v1773918117/anusch_rqxcwc.png" 
                alt="Logo" 
                className="h-24 md:h-32s w-auto object-contain transition-transform hover:scale-105"
              />
            </a>
          </div>
          <div className="flex-grow text-center">
            <h1 
              style={{ color: textColor }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
            >
              Anurag EM School
            </h1>
          </div>
          <div className="hidden lg:block w-32"></div>
        </div>
      </header>

      {/* SECTION 2: The Sticky Navigation Bar */}
      {/* This div is what "sticks" to the top of the browser */}
      <div 
        className={`sticky top-0 z-[100] w-full flex justify-center py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        style={!isScrolled ? backgroundGradient : {}}
      >
        <PillNav
          items={[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Gallery', href: '#gallery' },
            { label: 'Admissions', href: '#admissions' },
            { label: 'Events', href: '#events' },
            { label: 'News', href: '#news' }
          ]}
          pillColor="#5fc1f5ff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#030307ff"
        />
      </div>
    </>
  );
};

export default Navbar;