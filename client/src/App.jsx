import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// 1. Configure Global Axios Defaults
axios.defaults.baseURL = 'http://localhost:5001'; // Your Backend URL

function App() {
  
  useEffect(() => {
    // 2. Interceptor to inject Token into every request automatically
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 3. Response Interceptor to handle "Token Expired" (401)
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Optional: Clear storage and redirect to login if token is invalid
          // localStorage.removeItem('token');
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {/* All your pages (Home, About, AdminDashboard) render here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;