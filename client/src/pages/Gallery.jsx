import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Maximize2, Loader2, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get('https://anurag-school-website.onrender.com/api/gallery');
        setImages(data);
        setFilteredImages(data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === category));
    }
  };

  // Extract unique categories for the filter bar
  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#020205] pt-16 md:pt-24 pb-10 px-4">
      {/* 1. Header with Live Counter */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-blue-500/20 pb-4 md:pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter">
            ANU RAG EM SCHOOL <span className="text-blue-500 italic">MOMENTS</span>
          </h1>
          <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
            Capturing Excellence in Motion
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em]">
            VIEWING {filteredImages.length} OF {images.length}
          </span>
        </div>
      </div>

      {/* 2. Interactive Filter Bar */}
      {!loading && categories.length > 1 && (
        <div className="max-w-7xl mx-auto mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeFilter === cat 
                ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                : 'bg-transparent border-white/10 text-white/50 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <span className="text-blue-500/50 font-black text-[10px] tracking-widest">INITIALIZING GALLERY...</span>
        </div>
      ) : (
        /* 3. Interactive Staggered Grid */
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div 
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImg(img.imageUrl)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 break-inside-avoid shadow-2xl"
              >
                <motion.img 
                  src={img.imageUrl}
                  alt="School Moment" 
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Modern Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white font-black text-[10px] uppercase tracking-widest">
                      {img.category || 'Event'}
                    </span>
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <Maximize2 className="text-white" size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 4. Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[260]">
              <X size={40} strokeWidth={1} />
            </button>
            
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              alt="Enlarged" 
              className="max-w-full max-h-full rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;