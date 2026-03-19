import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Maximize2, Loader2 } from 'lucide-react';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get('https://anurag-school-website.onrender.com/api/gallery');
        setImages(data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] pt-24 pb-10 px-4">
      {/* Header HUD */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end border-b border-blue-500/20 pb-6">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
          ANU RAG SCHOOL <span className="text-blue-500">MEMORIES</span>
        </h1>
        <span className="text-[10px] font-bold text-blue-400/50 tracking-[0.3em]">
          TOTAL IMAGES: {images.length}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" /></div>
      ) : (
        /* 3-COLUMN DENSE MASONRY GRID (Eliminates gaps) */
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
          {images.map((img) => (
            <div 
              key={img._id} 
              onClick={() => setSelectedImg(img.imageUrl)}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 break-inside-avoid"
            >
              <img 
                src={img.imageUrl} 
                alt="School Moment" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Futuristic Overlay on Hover */}
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white" size={24} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- LIGHTBOX MODAL (When a pic is tapped) --- */}
     
    </div>
  );
}

export default Gallery;