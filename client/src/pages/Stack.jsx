import React, { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Stack = ({ 
  cards, 
  randomRotation = false, 
  sensitivity = 200, 
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false 
}) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % cards.length);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, cards.length]);

  const handleClick = () => {
    if (sendToBackOnClick) {
      setIndex((prev) => (prev + 1) % cards.length);
    }
  };

  return (
    <div 
      className="relative w-full h-full cursor-pointer flex items-center justify-center perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          const position = (i - index + cards.length) % cards.length;
          const isTop = position === 0;

          if (position > 3) return null;

          return (
            <motion.div
              key={i}
              style={{
                zIndex: cards.length - position,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1 - position * 0.15,
                scale: 1 - position * 0.04,
                y: position * 10,
                rotate: randomRotation ? (i % 2 === 0 ? position * 2 : position * -2) : 0,
              }}
              exit={{ 
                x: sensitivity, 
                opacity: 0, 
                scale: 1.1, 
                rotate: 20,
                transition: { duration: 0.4 } 
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            >
              {isTop ? (
                card
              ) : (
                // Solid navy blue backside for non-top cards
                <div className="w-full h-full rounded-[3.5rem] bg-[#1e3a8a] shadow-none border border-white/10" />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Stack;