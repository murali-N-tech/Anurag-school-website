import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GalleryUpload from './GalleryUpload';
import { Reorder } from 'framer-motion';
import { GripVertical, Trash2, Loader2, Plus, X } from 'lucide-react';

const API = 'http://localhost:5001/api/gallery';

function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  const getToken = () => {
    // Checks all common token key names automatically
    return (
      localStorage.getItem('token') ||
      localStorage.getItem('authToken') ||
      localStorage.getItem('jwt') ||
      localStorage.getItem('adminToken') ||
      ''
    );
  };

  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setItems(data);
    } catch (err) {
      console.error("Error fetching gallery:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newItem) => {
    fetchItems(); // Re-fetch to get the real DB object with correct _id
  };

  const handleReorder = async (newOrder) => {
    setItems(newOrder);
    try {
      await axios.put(
        `${API}/reorder`,
        { ids: newOrder.map(item => item._id) },
        authHeaders()
      );
    } catch (err) {
      console.error("Failed to save order:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id, fileId) => {
    if (!window.confirm("Delete this photo permanently?")) return;

    try {
      console.log("Deleting → id:", id, "fileId:", fileId, "token:", getToken());

      await axios.delete(`${API}/${id}`, {
        params: { fileId },
        ...authHeaders()
      });

      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response?.status, err.response?.data || err.message);
      alert(`Delete failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-8">
        <div>
          <h2 className="text-2xl font-black uppercase text-blue-950 tracking-tight">
            School Gallery
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {items.length} Photos in your collection
          </p>
        </div>

        <button
          onClick={() => setShowUpload(prev => !prev)}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl
            ${showUpload
              ? 'bg-red-50 text-red-600 border border-red-100'
              : 'bg-[#1e3a8a] text-white hover:bg-blue-800 active:scale-95'}
          `}
        >
          {showUpload ? <X size={16} /> : <Plus size={16} />}
          {showUpload ? 'Close Upload' : 'Add New Moment'}
        </button>
      </div>

      {/* UPLOAD AREA */}
      {showUpload && (
        <div className="w-full">
          <GalleryUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      )}

      {/* GALLERY LIST */}
      <div className="pt-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
              Your gallery is empty. Click "Add New Moment" to begin.
            </p>
          </div>
        ) : (
          <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
            {items.map((item) => (
              <Reorder.Item
                key={item._id}
                value={item}
                className="bg-white p-5 rounded-[2.5rem] flex items-center gap-8 border border-gray-100 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
              >
                {/* Drag Handle */}
                <div className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0">
                  <GripVertical size={24} />
                </div>

                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-inner border border-gray-100 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover"
                    alt="gallery"
                  />
                </div>

                {/* File ID */}
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-black text-blue-900/30 uppercase tracking-[0.3em] truncate block">
                    ID: {item.fileId?.slice(0, 20)}...
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent drag from triggering
                    handleDelete(item._id, item.fileId);
                  }}
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-red-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  );
}

export default AdminGallery;