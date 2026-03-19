// client/src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import PillNav from './PillNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold to change the appearance of the sticky bar
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
      <header style={backgroundGradient} className="w-full pt-4 md:pt-8 pb-2 md:pb-4">
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#home">
              <img 
                src="https://res.cloudinary.com/ddgfjerss/image/upload/v1773918117/anusch_rqxcwc.png" 
                alt="Logo" 
                className="h-12 sm:h-20 md:h-32 w-auto object-contain transition-transform hover:scale-105"
              />
            </a>
          </div>
          <div className="flex-grow text-center">
            <h1 
              style={{ color: textColor }}
              className="text-xl sm:text-3xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none"
            >
              Anurag EM School
            </h1>
          </div>
          {/* Spacer to keep title centered on desktop */}
          <div className="hidden lg:block w-32"></div>
        </div>
      </header>

      {/* SECTION 2: The Sticky Navigation Bar */}
      <div 
        className={`sticky top-0 z-[100] w-full flex justify-center py-2 md:py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        style={!isScrolled ? backgroundGradient : {}}
      >
        {/* Added 'max-w-full overflow-x-auto' to allow swiping on mobile 
          if the menu items exceed screen width. 
        */}
        <div className="w-full flex justify-center px-2 overflow-x-auto no-scrollbar">
          <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;