import React, { useState } from 'react';
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
      setFormData({
        studentName: '',
        dateOfBirth: '',
        parentName: '',
        email: '',
        phone: '',
      });
    } catch {
      setMessage('Failed to submit application.');
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-blue-50">

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">

          {/* 🔥 LEFT: GLASS FORM */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 p-10 rounded-3xl 
                       backdrop-blur-xl bg-white/20 
                       border border-white/30 
                       shadow-2xl"
          >
            <h1 className="text-4xl font-black text-white uppercase mb-2">
              Join Our Community
            </h1>

            <p className="text-white/80 mb-8 italic">
              Start your child's journey at Anurag EM School.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* INPUT */}
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Student Full Name"
                required
                className="w-full px-5 py-3 rounded-xl 
                           bg-white/80 backdrop-blur 
                           focus:bg-white 
                           border border-transparent 
                           focus:border-blue-500 
                           outline-none transition-all"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/80 focus:bg-white border border-transparent focus:border-blue-500 outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 ..."
                  required
                  className="w-full px-5 py-3 rounded-xl bg-white/80 focus:bg-white border border-transparent focus:border-blue-500 outline-none"
                />
              </div>

              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Parent/Guardian Name"
                required
                className="w-full px-5 py-3 rounded-xl bg-white/80 focus:bg-white border border-transparent focus:border-blue-500 outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-xl bg-white/80 focus:bg-white border border-transparent focus:border-blue-500 outline-none"
              />

              {/* 🚀 BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 mt-4 
                           bg-blue-600 hover:bg-blue-700 
                           text-white font-bold uppercase 
                           rounded-xl shadow-xl transition-all"
              >
                Submit Application
              </motion.button>
            </form>

            {/* MESSAGE */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center font-bold ${
                isError
                  ? 'bg-red-500/20 text-red-200 border border-red-400/30'
                  : 'bg-green-500/20 text-green-200 border border-green-400/30'
              }`}>
                {message}
              </div>
            )}
          </motion.div>

          {/* 🎯 RIGHT: CARD SWAP (UNCHANGED BUT ENHANCED) */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[500px]"
          >
            <div style={{ height: '600px', width: '100%', position: 'relative' }}>
              <CardSwap cardDistance={60} verticalDistance={70} delay={5000}>

                {[ 
                  {
                    img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912261/WhatsApp_Image_2026-03-19_at_13.25.26_nijwrc.jpg",
                    title: "Modern Campus",
                    desc: "World-class facilities"
                  },
                  {
                    img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912333/WhatsApp_Image_2026-03-19_at_13.26.57_1_cbnoxg.jpg",
                    title: "Holistic Growth",
                    desc: "Mental & physical wellness"
                  },
                  {
                    img: "https://res.cloudinary.com/ddgfjerss/image/upload/v1773912353/WhatsApp_Image_2026-03-19_at_13.28.07_1_dwng02.jpg",
                    title: "Academic Excellence",
                    desc: "Bright future"
                  }
                ].map((card, i) => (
                  <Card key={i}>
                    <div className="h-full w-full rounded-2xl overflow-hidden relative border-4 border-white/20">
                      <img src={card.img} className="h-full w-full object-cover" />
                      <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-2xl font-black">{card.title}</h3>
                        <p className="text-white/70">{card.desc}</p>
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