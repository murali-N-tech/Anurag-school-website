import React from 'react';

const MissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
  </svg>
);

const VisionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

function AboutPage() {
  return (
    <div className="relative text-[#304352] space-y-16 overflow-hidden min-h-screen">
      
      {/* --- BACKGROUND LOGO (20% Opacity, COLOR, No Grayscale) --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src="/anusch.png" 
          alt="Watermark" 
          className="w-full max-w-4xl opacity-10 transform scale-105" 
          // Grayscale class has been removed to show full color.
        />
      </div>

      {/* --- CONTENT (Layered above the logo) --- */}
      <div className="relative z-10">
        {/* 1. Page Header Section */}
        <div className="text-center max-w-5xl mx-auto pt-8">
          <h1 className="text-5xl md:text-5xl font-black uppercase tracking-tighter text-[#1e3a8a] mb-6">
            About <span className="text-blue-900">Anurag School</span>
          </h1>
    

          <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed text-slate-900 max-w-3xl mx-auto">
            <p>
              At Anurag EM School, our mission is rooted in a deep commitment to nurturing the holistic development of every student. We strive to shape confident, capable individuals who are prepared to thrive in an ever-evolving world.
            </p>

            <p>
              Our academic approach combines excellence with support, creating an environment where students are encouraged to think critically and achieve their best. Beyond academics, we foster creativity and personal growth through a wide range of co-curricular activities.
            </p>

            <p className="border-t border-[#1e3a8a]/20 pt-6">
              We are dedicated to instilling strong values and a sense of responsibility, guiding students to become ethical, compassionate, and globally aware citizens.
            </p>
          </div>
        </div>

        {/* 2. Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-10">
          {/* Mission Card */}
          <div className="group text-center p-10 bg-white/50 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-500">
            <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <MissionIcon />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-[#1e3a8a]">
              Our Mission
            </h2>
            <p className="text-base md:text-lg font-bold leading-relaxed opacity-70">
              To create a nurturing yet challenging environment where students achieve academic excellence while growing into responsible, ethical, and compassionate individuals.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group text-center p-10 bg-white/50 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-500">
            <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <VisionIcon />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-[#1e3a8a]">
              Our Vision
            </h2>
            <p className="text-base md:text-lg font-bold leading-relaxed opacity-70">
              To be a leading institution that inspires innovation, fosters excellence, and instills a lifelong love of learning, empowering students to lead with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;