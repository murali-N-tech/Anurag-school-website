import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

// --- Import Page Components ---
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdmissionsPage from './pages/AdmissionsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// --- Define Routes ---
const router = createBrowserRouter([
  {
    path: '/',
    // THE FIX: AuthProvider now wraps the App component *inside* the router's element.
    // This gives AuthProvider and all its children access to router hooks like useNavigate.
    element: (
      <AuthProvider>
        <App />
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

// The AuthProvider is no longer wrapping the RouterProvider here.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);