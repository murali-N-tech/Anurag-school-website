import React, { useState } from 'react';
import { createContactMessage } from '../services/api';
import { Mail, Phone, MapPin, Send, Loader2, Cpu, Zap } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ message: '', isError: false, loading: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    try {
      await createContactMessage(formData);
      setStatus({ message: 'WE WILL RESPOND SHORTLY.', isError: false, loading: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ message: 'ERROR. PLEASE RETRY AGAIN.', isError: true, loading: false });
    }
  };

  const inputStyle =
    "w-full bg-white border border-blue-200 rounded-2xl px-4 py-3 md:py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm md:text-base";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-20 md:pt-28 pb-10 md:pb-12 px-4 relative overflow-hidden">

      {/* LIGHT GLOW BLOBS */}
      <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-300 opacity-20 rounded-full blur-[80px] md:blur-[120px]"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-cyan-200 opacity-20 rounded-full blur-[80px] md:blur-[120px]"></div>

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-10 md:mb-16 border-b border-blue-200 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Cpu size={14} />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">Contact Us</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Contact <span className="text-blue-600">Us</span>
            </h1>
          </div>
          <div className="flex flex-row md:flex-col justify-between w-full md:w-auto items-center md:items-end border-t md:border-t-0 border-blue-100 pt-4 md:pt-0">
            <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">Available 24/7</p>
            <p className="text-[10px] md:text-xs text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Anurag EM School
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

          {/* FORM */}
          <div className="bg-white/70 backdrop-blur-xl border border-blue-200 p-6 md:p-12 rounded-[2rem] md:rounded-3xl shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-2">
              <Send size={20} className="text-blue-600" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} placeholder="Full Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="Email Address" />
              </div>

              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputStyle} placeholder="Subject" />

              <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required className={`${inputStyle} resize-none`} placeholder="Your Message"></textarea>

              <button type="submit" disabled={status.loading}
                className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition flex justify-center items-center gap-2 text-sm md:text-base shadow-lg shadow-blue-200">
                {status.loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={16} />}
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status.message && (
              <div className={`mt-6 p-4 rounded-xl text-xs md:text-sm font-medium border text-center
                ${status.isError ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                {status.message}
              </div>
            )}
          </div>

          {/* CONTACT INFO & MAP */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="bg-white/70 backdrop-blur-xl border border-blue-200 p-6 md:p-8 rounded-[2rem] md:rounded-3xl shadow-lg">
              <div className="grid gap-4 md:gap-6">
                {[
                  { icon: <MapPin size={18} />, label: "Location", value: "Eluru, Andhra Pradesh" },
                  { icon: <Phone size={18} />, label: "Phone", value: "+91 9491480402" },
                  { icon: <Mail size={18} />, label: "Email", value: "anuragenglishmediumschool@gmail.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 md:p-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-100/50 transition duration-300">
                    <div className="p-2 md:p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-slate-600 text-xs md:text-sm truncate md:whitespace-normal">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP SECTION */}
            <div className="h-[250px] md:h-[300px] rounded-[2rem] md:rounded-3xl overflow-hidden border border-blue-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15278.473557999713!2d81.0850!3d16.7110!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQyJzM5LjYiTiA4McKwMDUnMDYuMCJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;