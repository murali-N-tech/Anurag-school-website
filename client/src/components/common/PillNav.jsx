import React, { useState } from 'react';

const PillNav = ({ items, pillColor, pillTextColor, hoveredPillTextColor }) => {
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, width: 0, left: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (e, index) => {
    const { offsetLeft, offsetWidth } = e.target;
    setHoverStyle({
      opacity: 1,
      width: offsetWidth,
      left: offsetLeft,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverStyle(prev => ({ ...prev, opacity: 0 }));
    setHoveredIndex(null);
  };

  return (
    <div className="relative flex items-center bg-white/20 backdrop-blur-sm rounded-full p-1 border border-white/30 self-center shadow-inner">
      {/* Sliding Pill Background */}
      <div
        className="absolute h-[80%] transition-all duration-300 ease-out rounded-full z-0"
        style={{
          backgroundColor: pillColor,
          width: hoverStyle.width,
          left: hoverStyle.left,
          opacity: hoverStyle.opacity,
          top: '10%'
        }}
      />
      
      {items.map((item, index) => (
        <a
          key={item.label}
          href={item.href}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 px-5 py-2 text-sm md:text-base font-black uppercase tracking-wider transition-colors duration-200"
          style={{ 
            color: hoveredIndex === index ? hoveredPillTextColor : pillTextColor 
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default PillNav;