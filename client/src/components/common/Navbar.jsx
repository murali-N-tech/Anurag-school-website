import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Define Cafe Noir color
  const cafeNoir = '#4B3621'; // Hex: #4B3621, RGB: 75, 54, 33

  // Define EADDCARgb color for clicked/hovered buttons and text highlighting
  const buttonHighlightColor = '#EADDC2'; // Hex: #EADDC2, RGB: 234, 221, 202

  // Define Bone color for default link text
  const boneColor = '#E3DAC9'; // Hex: #E3DAC9, RGB: 227, 218, 201

  // Common styling for nav links (desktop)
  const baseNavLinkClasses = `px-3 py-2 rounded-md transition duration-300 ease-in-out font-medium`;

  // Mobile nav link classes
  const mobileNavLinkClasses = `block py-2 px-4 text-sm font-medium transition duration-300 ease-in-out`;

  // --- NEW: A common function for NavLink styling and hover logic ---
  const getNavLinkStyles = (isActive) => ({
    // Default color is boneColor. Active links will still be boneColor.
    // The hover effect will change the color temporarily.
    color: boneColor,
    backgroundColor: 'transparent',
    // We can still use isActive for font-weight if you want active links to be bold
    fontWeight: isActive ? '700' : '500'
  });

  const handleMouseOver = (e) => {
    // Apply hover effect regardless of active state
    e.currentTarget.style.backgroundColor = buttonHighlightColor;
    e.currentTarget.style.color = cafeNoir;
  };

  const handleMouseOut = (e) => {
    // Revert to default boneColor and transparent background
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = boneColor;
  };

  // --- END NEW ---

  return (
    <header className="shadow-md sticky top-0 z-50 border-b" style={{ backgroundColor: cafeNoir, borderColor: buttonHighlightColor }}>
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Brand Logo and Name - Aligned Left and Responsive */}
          <NavLink to="/" className="flex items-center space-x-2 text-white hover:text-opacity-80 transition duration-300">
            <img
              src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752938966/Gemini_Generated_Image_wwzlmiwwzlmiwwzl_a4il0e.png"
              alt="Anurag EM School Logo"
              className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
            <span className="text-xl sm:text-3xl lg:text-4xl font-bold" style={{ color: buttonHighlightColor }}>ANURAG EM SCHOOL</span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {['Home', 'About', 'Admissions', 'Events', 'Contact'].map((linkName) => (
              <NavLink
                key={linkName}
                to={linkName === 'Home' ? '/' : `/${linkName.toLowerCase()}`}
                className={baseNavLinkClasses}
                style={({ isActive }) => getNavLinkStyles(isActive)} // Use the new function
                onMouseOver={handleMouseOver} // Use the new function
                onMouseOut={handleMouseOut}   // Use the new function
              >
                {linkName}
              </NavLink>
            ))}

            {/* Conditional Auth Links for Desktop */}
            {user ? (
              <>
                <NavLink
                  to="/admin"
                  className={baseNavLinkClasses}
                  style={({ isActive }) => getNavLinkStyles(isActive)}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out"
                  // For buttons, if you want hover only, keep direct style and hover/out handlers
                  style={{ backgroundColor: 'rgb(220, 38, 38)', color: 'white' }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = buttonHighlightColor; e.currentTarget.style.color = cafeNoir; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgb(220, 38, 38)'; e.currentTarget.style.color = 'white'; }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'transparent' : 'rgb(37, 99, 235)', // Default blue for login button, transparent if it's active somehow (unlikely for login)
                  color: isActive ? boneColor : 'white', // Default white, boneColor if active
                  fontWeight: isActive ? '700' : '500'
                })}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = buttonHighlightColor; e.currentTarget.style.color = cafeNoir; }}
                onMouseOut={(e) => {
                  // Revert based on default style for login button
                  if (!e.currentTarget.classList.contains('active')) {
                     e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
                     e.currentTarget.style.color = 'white';
                  } else {
                     e.currentTarget.style.backgroundColor = 'transparent';
                     e.currentTarget.style.color = boneColor;
                  }
                }}
              >
                Admin Login
              </NavLink>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none focus:text-opacity-80">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t pt-4" style={{ borderColor: buttonHighlightColor }}>
            {['Home', 'About', 'Admissions', 'Events', 'Contact'].map((linkName) => (
              <NavLink
                key={linkName}
                to={linkName === 'Home' ? '/' : `/${linkName.toLowerCase()}`}
                className={mobileNavLinkClasses}
                style={({ isActive }) => getNavLinkStyles(isActive)} // Use new function
                onClick={() => setIsOpen(false)}
                onMouseOver={handleMouseOver} // Use new function
                onMouseOut={handleMouseOut}   // Use new function
              >
                {linkName}
              </NavLink>
            ))}

            {/* Conditional Auth Links for Mobile */}
            {user ? (
              <>
                <NavLink
                  to="/admin"
                  className={mobileNavLinkClasses}
                  style={({ isActive }) => getNavLinkStyles(isActive)}
                  onClick={() => setIsOpen(false)}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-left block py-2 px-4 text-sm rounded-md transition duration-300 ease-in-out"
                  style={{ color: 'white', backgroundColor: 'rgb(220, 38, 38)' }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = buttonHighlightColor; e.currentTarget.style.color = cafeNoir; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgb(220, 38, 38)'; e.currentTarget.style.color = 'white'; }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="w-full text-left block py-2 px-4 text-sm rounded-md transition duration-300 ease-in-out"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'transparent' : 'rgb(37, 99, 235)',
                  color: isActive ? boneColor : 'white',
                  fontWeight: isActive ? '700' : '500'
                })}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = buttonHighlightColor; e.currentTarget.style.color = cafeNoir; }}
                onMouseOut={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                     e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
                     e.currentTarget.style.color = 'white';
                  } else {
                     e.currentTarget.style.backgroundColor = 'transparent';
                     e.currentTarget.style.color = boneColor;
                  }
                }}
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;