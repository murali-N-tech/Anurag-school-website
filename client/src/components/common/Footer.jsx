import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react'; // Added icons for a modern look

function Footer() {
  // Use the exact gradient from your Navbar
  const backgroundGradient = {
    background: 'linear-gradient(104deg, rgba(48, 83, 112, 1) 0%, rgba(35, 84, 168, 1) 53%)'
  };

  // Theme Colors
  const accentColor = '#000000ff'; // Light Sky Blue matching your PillNav
  const textColor = '#000000ff';  // Off-white for readability

  return (
    <footer style={backgroundGradient} className="relative text-white border-t border-white/10 overflow-hidden">
      {/* Decorative Blur Element */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto py-16 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* 1. School Branding Section */}
          <div className="space-y-6">
            <h3 className="text-5xl font-black uppercase tracking-tighter leading-none" style={{ color: accentColor }}>
              Anurag EM School
            </h3>
            <p className="text-sm leading-relaxed opacity-100 max-w-sm mx-auto md:mx-0 font-medium">
              Fostering critical thinking, creativity, and communication. 
              Empowering students with 21st-century skills through innovation 
              and dedicated mentorship.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 opacity-100 text-sm">
              <MapPin size={18} style={{ color: accentColor }} />
              <span>Eluru Ponangi Road, Andhra Pradesh 534001</span>
            </div>
          </div>

          {/* 2. Quick Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-4xl font-black uppercase tracking-widest mb-6" style={{ color: accentColor }}>
              Navigation
            </h3>
            <ul className="space-y-3 font-bold uppercase text-6xs tracking-[0.2em]">
              {['Home', 'About', 'Admissions', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="transition-all duration-300 hover:translate-x-2 inline-block opacity-70 hover:opacity-100"
                    style={({ isActive }) => isActive ? { color: accentColor, opacity: 1 } : { color: textColor }}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-widest mb-6" style={{ color: accentColor }}>
              Connect With Us
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:anuragenglishmediumschool@gmail.com" 
                className="group flex items-center justify-center md:justify-start gap-3 transition-all"
                style={{ color: textColor }}
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Mail size={18} style={{ color: accentColor }} />
                </div>
                <span className="text-sm opacity-100 group-hover:opacity-100 truncate">anuragenglishmediumschool@gmail.com</span>
              </a>

              <a 
                href="tel:+91-9491480402" 
                className="group flex items-center justify-center md:justify-start gap-3 transition-all"
                style={{ color: textColor }}
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Phone size={18} style={{ color: accentColor }} />
                </div>
                <span className="text-sm opacity-80 group-hover:opacity-100">+91 9491480402</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            &copy; {new Date().getFullYear()} Anurag EM School. Built by StackZy Tech.
          </p>
          <div className="flex gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <Globe size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest cursor-default">Official School Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;