import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api'; // Assuming you have this API service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // This effect runs on initial load to check if the user is already logged in
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
  }, []);

  // Updated login function to be async and handle API calls
  const login = async (email, password) => {
    try {
      // Call the backend API to verify credentials
      const { data } = await loginAdmin({ email, password });
      
      // Save user info (including token) to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Set user state
      setUser(data);

      // THE FIX: Navigate to the correct admin route
      navigate('/admin');

    } catch (error) {
      console.error('Login failed:', error);
      // Throw error to be handled by the component calling login
      throw error;
    }
  };

  // Updated logout function to clear localStorage
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};