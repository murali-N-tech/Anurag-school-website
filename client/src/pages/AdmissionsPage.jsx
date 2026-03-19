import React, { useState, useEffect } from 'react';
import { submitAdmission } from '../services/api'; 
import CardSwap, { Card } from './CardSwap'; 
import { motion } from 'framer-motion';

function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    parentName: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle dynamic resizing for CardSwap distances
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await submitAdmission(formData); 
      setMessage('Application submitted successfully!'); 
      setIsError(false);
      setFormData({ studentName: '', dateOfBirth: '', parentName: '', email: '', phone: '' });
    } catch {
      setMessage('Failed to submit application.'); 
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-16 flex items-center justify-center bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 items-center lg:items-stretch">

          {/* 🔥 LEFT: GLASS FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 p-6 md:p-10 rounded-[2.5rem] md:rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl order-2 lg:order-1"
          >
            <h1 className="text-2xl md:text-4xl font-black text-[#1e3a8a] uppercase mb-2">
              Join Our Community
            </h1>
            <p className="text-[#1e3a8a]/80 mb-6 md:mb-8 italic text-sm md:text-base">
              Start your child's journey at Anurag EM School.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Student Full Name"
                required
                className="w-full px-4 md:px-5 py-3 rounded-xl bg-white/80 focus:bg-white border border-transparent focus:border-blue-500 outline-none transition-all text-sm md:text-base"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 md:px-5 py-3 rounded-xl bg-white/80 focus:bg-white outline-none text-sm md:text-base"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 md:px-5 py-3 rounded-xl bg-white/80 focus:bg-white outline-none text-sm md:text-base"
                />
              </div>

              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent/Guardian Name"
                required
                className="w-full px-4 md:px-5 py-3 rounded-xl bg-white/80 focus:bg-white outline-none text-sm md:text-base"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 md:px-5 py-3 rounded-xl bg-white/80 focus:bg-white outline-none text-sm md:text-base"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 md:py-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase rounded-xl shadow-xl transition-all text-sm md:text-base"
              >
                Submit Application
              </motion.button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center font-bold text-xs md:text-sm border ${
                isError ? 'bg-red-500/20 text-red-800 border-red-400/30' : 'bg-green-500/20 text-green-800 border-green-400/30'
              }`}>
                {message}
              </div>
            )}
          </motion.div>

          {/* 🎯 RIGHT: RESPONSIVE CARD SWAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2"
          >
            {/* Explicit height is required for the CardSwap component to position 
               absolute elements correctly. We use 400px on mobile and 600px on desktop.
            */}
            <div className="w-full max-w-[500px] h-[400px] md:h-[600px] relative">
              <CardSwap 
                cardDistance={isMobile ? 30 : 60} 
                verticalDistance={isMobile ? 35 : 70} 
                delay={5000}
              >
                {[ 
                  { img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912261/WhatsApp_Image_2026-03-19_at_13.25.26_nijwrc.jpg", title: "Modern Campus", desc: "World-class facilities" },
                  { img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912333/WhatsApp_Image_2026-03-19_at_13.26.57_1_cbnoxg.jpg", title: "Holistic Growth", desc: "Mental & physical wellness" },
                  { img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912353/WhatsApp_Image_2026-03-19_at_13.28.07_1_dwng02.jpg", title: "Academic Excellence", desc: "Bright future" }
                ].map((card, i) => (
                  <Card key={i}>
                    <div className="h-full w-full rounded-[2rem] overflow-hidden relative border-2 md:border-4 border-white/40 shadow-xl bg-white">
                      <img src={card.img} className="h-full w-full object-cover" alt={card.title} />
                      <div className="absolute bottom-0 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent w-full">
                        <h3 className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">{card.title}</h3>
                        <p className="text-white/80 text-[10px] md:text-sm font-medium">{card.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionsPage;