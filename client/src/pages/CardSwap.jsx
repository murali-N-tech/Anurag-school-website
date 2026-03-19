import React, { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Card = ({ children }) => {
  return <div className="w-full h-full">{children}</div>;
};

const CardSwap = ({ 
  children, 
  cardDistance = 60, 
  verticalDistance = 70, 
  delay = 5000, 
  pauseOnHover = false 
}) => {
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay);
    return () => clearInterval(interval);
  }, [items.length, delay]);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <AnimatePresence mode="popLayout">
        {items.map((child, i) => {
          // Calculate position relative to the current active index
          const position = (i - index + items.length) % items.length;
          const isVisible = position < 3; // Show only top 3 cards

          if (!isVisible) return null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: verticalDistance }}
              animate={{
                opacity: 1 - position * 0.2,
                scale: 1 - position * 0.1,
                y: -position * verticalDistance,
                zIndex: items.length - position,
              }}
              exit={{ opacity: 0, scale: 1.1, y: -200 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute w-full h-full"
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardSwap;