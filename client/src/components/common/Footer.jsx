function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">Anurag</h3>
            <p className="text-gray-400">Committed to excellence in education.</p>
            <p className="text-gray-400 mt-2">Poningi,Eluru, Andhra Pradesh</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="/admissions" className="text-gray-400 hover:text-white">Admissions</a></li>
              <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            {/* Add social media icons here if needed */}
            <p className="text-gray-400">info@srichaitanya.school</p>
            <p className="text-gray-400">+91 123 456 7890</p>
          </div>
        </div>
        <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-6">
          <p>&copy; Anurag School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
