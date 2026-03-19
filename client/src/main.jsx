import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

// --- Import UI Components & Pages ---
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdmissionsPage from './pages/AdmissionsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';

// --- Define Routes ---
const router = createBrowserRouter([
  {
    path: '/',
    // Logic from App.jsx is moved directly here as the root element
    element: (
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'admissions', element: <AdmissionsPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'news/:id', element: <NewsDetailPage /> },
      {
        path: 'admin',
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <AdminDashboard /> }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);