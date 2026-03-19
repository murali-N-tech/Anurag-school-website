import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api/gallery';

function GalleryUpload({ onUploadSuccess }) {
  const [status, setStatus] = useState('idle');

  const publicKey = "public_r5ICpHaf9YkR2ktyTc+euFH2+yI=";
  const urlEndpoint = "https://ik.imagekit.io/mw82ur7r5x/manu";

  const getToken = () => (
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('jwt') ||
    localStorage.getItem('adminToken') ||
    ''
  );

  // ✅ authenticator function for imagekitio-react v4+
  const authenticator = async () => {
    try {
      const response = await axios.get(`${API}/auth`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const { signature, expire, token } = response.data;
      return { signature, expire, token };
    } catch (err) {
      console.error("ImageKit auth error:", err.response?.data || err.message);
      throw new Error("Authentication failed");
    }
  };

  const onUploadStart = () => setStatus('uploading');

  const onError = (err) => {
    console.error("ImageKit Upload Error:", err);
    setStatus('error');
    setTimeout(() => setStatus('idle'), 4000);
  };

  const onSuccess = async (res) => {
    try {
      await axios.post(
        API,
        { url: res.url, fileId: res.fileId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess();
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      console.error("Database Save Error:", err.response?.data || err.message);
      setStatus('error');
    }
  };

  return (
    <div className="w-full px-1 pb-4">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div className={`relative border-4 border-dashed rounded-[3rem] p-12 transition-all duration-500 flex flex-col items-center justify-center text-center
          ${status === 'uploading' ? 'border-blue-400 bg-blue-50/50' :
            status === 'success'   ? 'border-green-400 bg-green-50/50' :
            status === 'error'     ? 'border-red-400 bg-red-50/50' :
            'border-blue-900/10 bg-gray-50/50 hover:border-[#1e3a8a]'}
        `}>

          <div className="mb-4">
            {status === 'idle'      && <Upload       size={40} className="text-[#1e3a8a]/30" />}
            {status === 'uploading' && <Loader2      size={40} className="text-blue-600 animate-spin" />}
            {status === 'success'   && <CheckCircle2 size={40} className="text-green-600" />}
            {status === 'error'     && <AlertCircle  size={40} className="text-red-600" />}
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-[#1e3a8a]">
            {status === 'uploading' ? "Uploading Moment..." :
             status === 'success'   ? "Upload Complete!" :
             status === 'error'     ? "Upload Failed" :
             "Add Gallery Photos"}
          </h3>

          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-900/40 mt-1">
            {status === 'error'
              ? "Try a smaller image file (JPG/PNG)"
              : "Select a photo from your computer"}
          </p>

          <div className="mt-6">
            <label className="bg-[#1e3a8a] text-white font-black py-3 px-8 rounded-xl cursor-pointer hover:bg-blue-800 transition-all shadow-lg uppercase tracking-widest text-[10px] inline-block">
              Choose File
              <IKUpload
                useUniqueFileName={true}
                className="hidden"
                onUploadStart={onUploadStart}
                onError={onError}
                onSuccess={onSuccess}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </IKContext>
    </div>
  );
}

export default GalleryUpload;