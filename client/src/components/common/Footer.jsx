import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink for consistency and active styling

function Footer() {
  // Define Cafe Noir color for the background
  const cafeNoir = '#4B3621'; // Hex: #4B3621, RGB: 75, 54, 33

  // Define Bone color for general text (for contrast on dark background)
  const boneColor = '#E3DAC9'; // Hex: #E3DAC9, RGB: 227, 218, 201

  // Define a lighter amber for headings (to stand out)
  const lightAmberHeading = '#FCD34D'; // Example: Tailwind's amber-300 or similar light amber

  // Define the hover/active link color (a slightly brighter version for visibility)
  const linkHoverActiveColor = '#FDE68A'; // Example: Tailwind's amber-200 or similar

  return (
    <footer className="text-white border-t" style={{ backgroundColor: cafeNoir, borderColor: boneColor }}> {/* Cafe Noir background, Bone border */}
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-4xl font-bold mb-4" style={{ color: lightAmberHeading }}>Anurag EM School</h3> {/* Lighter amber heading */}
            <p className="text-sm leading-relaxed" style={{ color: boneColor }}>
              ANURAG EM School provides quality education by fostering critical thinking, creativity, and communication.
              We empower students with 21st-century skills through a robust curriculum, dedicated faculty, and modern facilities.
            </p>
            <p className="text-sm mt-3" style={{ color: boneColor }}>Eluru Ponangi Road, Andhra Pradesh 534001</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-3xl font-semibold mb-4" style={{ color: lightAmberHeading }}>Quick Links</h3> {/* Lighter amber heading */}
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/"
                  className="transition-colors duration-200"
                  style={({ isActive }) => isActive ? { color: linkHoverActiveColor } : { color: boneColor }}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
                  onMouseOut={(e) => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.color = boneColor; }}}
                >
                  Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/about"
                  className="transition-colors duration-200"
                  style={({ isActive }) => isActive ? { color: linkHoverActiveColor } : { color: boneColor }}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
                  onMouseOut={(e) => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.color = boneColor; }}}
                >
                  About Us
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/admissions"
                  className="transition-colors duration-200"
                  style={({ isActive }) => isActive ? { color: linkHoverActiveColor } : { color: boneColor }}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
                  onMouseOut={(e) => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.color = boneColor; }}}
                >
                  Admissions
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/events"
                  className="transition-colors duration-200"
                  style={({ isActive }) => isActive ? { color: linkHoverActiveColor } : { color: boneColor }}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
                  onMouseOut={(e) => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.color = boneColor; }}}
                >
                  Events
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/contact"
                  className="transition-colors duration-200"
                  style={({ isActive }) => isActive ? { color: linkHoverActiveColor } : { color: boneColor }}
                  onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
                  onMouseOut={(e) => { if (!e.currentTarget.classList.contains('active')) { e.currentTarget.style.color = boneColor; }}}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="text-3xl font-semibold mb-4" style={{ color: lightAmberHeading }}>Connect With Us</h3> {/* Lighter amber heading */}
            {/* Using a regular anchor tag for mailto/tel for direct action */}
            <a className="text-sm block" href="mailto:anuragenglishmediumschool@gmail.com" style={{ color: boneColor }}
               onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
               onMouseOut={(e) => e.currentTarget.style.color = boneColor}>
              anuragenglishmediumschool@gmail.com
            </a>
            <a className="text-sm mt-1 block" href="tel:+91-9491480402" style={{ color: boneColor }}
               onMouseOver={(e) => e.currentTarget.style.color = linkHoverActiveColor}
               onMouseOut={(e) => e.currentTarget.style.color = boneColor}>
              +91 9491480402
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center border-t mt-8 pt-6 text-sm" style={{ color: boneColor, borderColor: boneColor }}> {/* Bone color for copyright text and border */}
          <p>&copy; {new Date().getFullYear()} Anurag EM School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
