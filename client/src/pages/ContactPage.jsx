import React, { useState } from 'react';
import { createContactMessage } from '../services/api';
import { Mail, Phone, MapPin, Send, Loader2, ShieldCheck, Cpu, Zap } from 'lucide-react';

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
    "w-full bg-white border border-blue-200 rounded-2xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all";

  const labelStyle =
    "text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-28 pb-12 px-4 relative overflow-hidden">

      {/* LIGHT GLOW BLOBS */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-300 opacity-30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-200 opacity-30 rounded-full blur-[120px]"></div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-16 border-b border-blue-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Cpu size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Contact <span className="text-blue-600">Us</span>
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Available 24/7</p>
            <p className="text-xs text-blue-600 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Anurag EM School
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-white/70 backdrop-blur-xl border border-blue-200 p-8 md:p-12 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Send size={20} className="text-blue-600" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} placeholder="Full Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="Email Address" />
              </div>

              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputStyle} placeholder="Subject" />

              <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required className={`${inputStyle} resize-none`} placeholder="Your Message"></textarea>

              <button type="submit" disabled={status.loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition flex justify-center items-center gap-2">
                {status.loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={16} />}
                Send Message
              </button>
            </form>

            {status.message && (
              <div className={`mt-6 p-4 rounded-xl text-sm font-medium border
                ${status.isError ? 'bg-red-100 text-red-600 border-red-200' : 'bg-green-100 text-green-600 border-green-200'}`}>
                {status.message}
              </div>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col gap-6">

            <div className="bg-white/70 backdrop-blur-xl border border-blue-200 p-8 rounded-3xl shadow-lg">
              <div className="grid gap-6">
                {[
                  { icon: <MapPin />, label: "Location", value: "Eluru, Andhra Pradesh" },
                  { icon: <Phone />, label: "Phone", value: "+91 9491480402" },
                  { icon: <Mail />, label: "Email", value: "anuragenglishmediumschool@gmail.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{item.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase">{item.label}</p>
                      <p className="text-slate-600 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div className="h-[300px] rounded-3xl overflow-hidden border border-blue-200 shadow-lg">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.852952224336!2d81.10846099999999!3d16.6842403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361584341fe779%3A0x9f74fc517b25552c!2sAnurag%20Group!5e0!3m2!1sen!2sin!4v1752949636221!5m2!1sen!2sin"
                className="w-full h-full grayscale invert opacity-60 contrast-125 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-1000"
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