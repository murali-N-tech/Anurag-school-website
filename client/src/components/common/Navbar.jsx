import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const activeLinkStyle = { color: '#3b82f6', fontWeight: '600' };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-gray-800">SriChaitanya</NavLink>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">Home</NavLink>
            <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">About</NavLink>
            <NavLink to="/admissions" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">Admissions</NavLink>
            <NavLink to="/events" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">Events</NavLink>
            <NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">Contact</NavLink>
            {user ? (
              <>
                <NavLink to="/admin" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-500">Dashboard</NavLink>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">Admin Login</NavLink>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4">
            <NavLink to="/" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setIsOpen(false)}>Home</NavLink>
            {user ? (
              <>
                <NavLink to="/admin" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block py-2 px-4 text-sm text-red-600 hover:bg-gray-100">Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="block py-2 px-4 text-sm hover:bg-gray-100" onClick={() => setIsOpen(false)}>Admin Login</NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
export default Navbar;