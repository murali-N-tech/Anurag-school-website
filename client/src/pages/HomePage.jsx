import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Or your preferred icons

function HomePage() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define Bone color
  const boneColor = '#E3DAC9'; // Hex: #E3DAC9, RGB: 227, 218, 201
  const darkBrown = '#4E2A0D'; // Defined the dark brown color for headings

  // --- Slideshow Data ---
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924907/generated-image-3_gncgs3.png',
      title: 'Welcome to Anurag School',
      subtitle: 'Nurturing the leaders of tomorrow.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924915/IMG_20250621_070849_cii4ov.jpg',
      title: 'Yoga and Wellness',
      subtitle: 'To make every student a healthy and happy individual.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924916/IMG_20250228_105144_ckyvjl.jpg',
      title: 'Innovate and Inspire',
      subtitle: 'Fostering a passion for science and technology.',
    },
    {
      imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1752941476/WhatsApp_Image_2025-07-19_at_21.40.11_395e5c98_u3wasx.jpg',
      title: 'Celebrating Success',
      subtitle: 'Preparing students for a bright future.',
    },
  ];

  // --- Slideshow Logic ---
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    // Auto-play functionality
    const sliderInterval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    // Fetch news data
    const getNews = async () => {
      try {
        const { data } = await fetchNews();
        setNews(data.slice(0, 3)); // Get latest 3 news articles
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    getNews();

    // Cleanup interval on component unmount
    return () => clearInterval(sliderInterval);
  }, [currentIndex]); // Only re-run if currentIndex changes to re-start interval

  // Common Heading Component for reusability and consistency
  const SectionHeading = ({ children }) => (
    <h2
      className="text-3xl sm:text-4xl font-extrabold mb-8 py-3 px-6 inline-block rounded-md shadow-lg"
      style={{ backgroundColor: darkBrown, color: 'white' }}
    >
      {children}
    </h2>
  );

  return (
    // Apply Bone color to the main container and ensure it covers the whole screen height
    <div style={{ backgroundColor: boneColor }} className="min-h-screen font-sans">
      {/* Hero Slideshow Section */}
      <section className="h-[60vh] md:h-[80vh] w-full relative group overflow-hidden shadow-xl">
        {/* Slide Content */}
        <div
          style={{ backgroundImage: `url(${banners[currentIndex].imageUrl})` }}
          className="w-full h-full bg-center bg-cover duration-700 ease-in-out transform scale-100 group-hover:scale-105"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Text and Button */}
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              {banners[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl font-light drop-shadow-md">
              {banners[currentIndex].subtitle}
            </p>
            <Link
              to="/admissions"
              className="bg-white text-blue-700 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors duration-300">
          <ChevronLeft onClick={goToPrevious} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors duration-300">
          <ChevronRight onClick={goToNext} size={30} />
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center py-2 space-x-2">
          {banners.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            ></div>
          ))}
        </div>
      </section>

      {/* Aim and Objectives Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: boneColor }}>
        <div className="container mx-auto">
          <SectionHeading>Aim and Objectives</SectionHeading>
          <p className="text-gray-800 text-lg leading-relaxed mt-6 max-w-4xl mx-auto">
            The primary aim of Anurag EM School is to foster a transformative educational environment that empowers students to achieve academic excellence, cultivate holistic development, and emerge as responsible, ethical, and innovative global citizens prepared to contribute positively to society.
          </p>
          <ul className="text-gray-700 text-base list-disc list-inside mt-8 space-y-3 max-w-3xl mx-auto text-left">
            <li>To provide a rigorous and comprehensive curriculum, delivered by highly qualified educators, that stimulates intellectual curiosity, critical thinking, and a lifelong love of learning.</li>
            <li>To nurture the physical, emotional, social, and creative faculties of every student through a diverse array of co-curricular activities, sports, and arts programs.</li>
            <li>To instill strong moral values, ethics, empathy, and a sense of social responsibility, guiding students to become compassionate and principled individuals.</li>
            <li>To promote a safe, inclusive, and supportive learning community where every student feels valued and respected.</li>
            <li>To equip students with the necessary skills and knowledge to adapt to a rapidly changing world and pursue their passions.</li>
          </ul>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: boneColor }}>
        <div className="container mx-auto">
          <SectionHeading>Latest News</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {news.length > 0 ? news.map(article => (
              <div key={article._id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-transform duration-300 border border-gray-100">
                <img src={article.imageUrl || 'https://placehold.co/600x400/E2DAC9/4E2A0D?text=No+Image+Available'} alt={article.title} className="w-full h-52 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 font-medium">{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-gray-700 line-clamp-4 leading-relaxed mb-4">{article.content}</p>
                  <Link to={`/news/${article._id}`} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 inline-flex items-center">
                    Read More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-600 col-span-full text-lg">Loading latest news, please wait...</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Members Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: boneColor }}>
        <div className="container mx-auto">
          <SectionHeading>Our Members</SectionHeading>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-gray-800 mt-6 mb-12">
            Meet the dedicated team behind Anurag EM School, committed to nurturing young minds and fostering a vibrant learning community.
          </p>
          <div className="flex flex-wrap justify-center -m-4">
            {/* Member 1 */}
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752948517/66c066c9-fd42-49ee-93a3-1f9ebed02d76_kvfdop.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Peter G</h3>
                  <p className="text-gray-600 mb-3 font-medium">CHAIRMAN</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed"> Unwavering dedication fosters a thriving learning environment, consistently prioritizing student success and community growth. </p>
                  <span className="inline-flex space-x-3">
                    <a className="text-gray-500 hover:text-blue-600 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-blue-400 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-pink-500 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {/* Member 2 */}
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752948518/IMG_20200120_203220_ew0qmw.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Kumari G</h3>
                  <p className="text-gray-600 mb-3 font-medium">PRINCIPAL</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Ensuring a well-structured and effective learning experience for all students by overseeing curriculum development and academic programs.</p>
                  <span className="inline-flex space-x-3">
                    <a className="text-gray-500 hover:text-blue-600 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-blue-400 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-pink-500 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {/* Member 3 */}
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://dummyimage.com/202x202/4E2A0D/E3DAC9"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">DOMINIC G</h3>
                  <p className="text-gray-600 mb-3 font-medium">TREASURER</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Providing guidance and support to help students thrive emotionally and socially, fostering a positive and inclusive school environment.</p>
                  <span className="inline-flex space-x-3">
                    <a className="text-gray-500 hover:text-blue-600 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-blue-400 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-pink-500 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {/* Member 4 */}
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://dummyimage.com/203x203/4E2A0D/E3DAC9"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">JOSEPH G</h3>
                  <p className="text-gray-600 mb-3 font-medium">TREASURER</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Promoting physical fitness and teamwork through various sports activities, instilling discipline and a healthy lifestyle.</p>
                  <span className="inline-flex space-x-3">
                    <a className="text-gray-500 hover:text-blue-600 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-blue-400 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500 hover:text-pink-500 transition-colors duration-200" href="#!">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;