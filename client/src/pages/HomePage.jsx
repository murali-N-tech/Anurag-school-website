import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SkeletonCard from '../components/common/SkeletonCard';

function HomePage() {
  // State for news, slideshow, and the new loading status
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsLoading, setNewsLoading] = useState(true);

  // --- Theme Colors ---
  const boneColor = '#E3DAC9';
  const darkBrown = '#4E2A0D';

  // --- Slideshow Banner Data ---
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
  // ▼▼▼ THIS FUNCTION IS UPDATED FOR THE FIX ▼▼▼
  const goToPrevious = () => {
    // Use functional update `setCurrentIndex(prevIndex => ...)`
    // This ensures we always have the latest index value.
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // ▼▼▼ THIS FUNCTION IS UPDATED FOR THE FIX ▼▼▼
  const goToNext = () => {
    // Use functional update `setCurrentIndex(prevIndex => ...)`
    // This solves the bug where the slideshow would get stuck.
    setCurrentIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // --- Effects Hook ---
  useEffect(() => {
    // This interval will now call the corrected `goToNext` and work perfectly.
    const sliderInterval = setInterval(goToNext, 5000);

    const getNews = async () => {
      try {
        setNewsLoading(true);
        const { data } = await fetchNews();
        setNews(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    getNews();

    return () => clearInterval(sliderInterval);
  }, []); // The empty dependency array is correct with this fix.

  // --- Reusable Section Heading Component ---
  const SectionHeading = ({ children }) => (
    <h2
      className="text-3xl sm:text-4xl font-extrabold mb-8 py-3 px-6 inline-block rounded-md shadow-lg"
      style={{ backgroundColor: darkBrown, color: 'white' }}
    >
      {children}
    </h2>
  );

  return (
    <div style={{ backgroundColor: boneColor }} className="min-h-screen font-sans">
      
      {/* Hero Slideshow Section */}
      <section className="h-[60vh] md:h-[80vh] w-full relative group overflow-hidden shadow-xl">
        {/* The rendering logic is correct and remains the same */}
        {banners.map((banner, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${banner.imageUrl})` }}
            className={`
              absolute inset-0 w-full h-full bg-center bg-cover 
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                {banner.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl font-light drop-shadow-md">
                {banner.subtitle}
              </p>
              <Link
                to="/admissions"
                className="bg-white text-blue-700 font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors duration-300 z-20">
          <ChevronLeft onClick={goToPrevious} size={30} />
        </div>
        <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors duration-300 z-20">
          <ChevronRight onClick={goToNext} size={30} />
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center py-2 space-x-2 z-20">
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
      
      {/* Gallery Section 1 */}
      <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924922/IMG_20250228_100328_opclbp.jpeg"/>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924914/IMG_20250228_105446_ehu9nv.jpeg"/>
            </div>
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924915/IMG_20250621_065849_vnq5bv.jpeg"/>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924912/IMG_20250109_135254_re92jh.jpeg"/>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924912/IMG_20250126_091207_psere5.jpeg"/>
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752924915/IMG_20250621_070849_cii4ov.jpeg"/>
            </div>
          </div>
        </div>
      
      {/* Gallery Section 2 */}
      <div className="flex flex-wrap md:-m-2 -m-1">
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 p-1 w-1/2">
            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995931/IMG_1884_kdv9x8.jpeg"/>
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995933/IMG_1879_lmhdoy.jpeg"/>
          </div>
          <div className="md:p-2 p-1 w-full">
            <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995933/IMG_0276_aly4mk.jpeg"/>
          </div>
        </div>
        <div className="flex flex-wrap w-1/2">
          <div className="md:p-2 p-1 w-full">
            <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995929/IMG_20200130_150901_hqdxfp.jpeg"/>
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995931/IMG_6239_adkdcc.jpeg"/>
          </div>
          <div className="md:p-2 p-1 w-1/2">
            <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752995931/IMG_0076_vyajab.jpeg"/>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: boneColor }}>
        <div className="container mx-auto">
          <SectionHeading>Latest News</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {newsLoading ? (
              [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
            ) : news.length > 0 ? (
              news.map(article => (
                <div key={article._id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-transform duration-300 border border-gray-100">
                  <img src={article.imageUrl || 'https://placehold.co/600x400/E2DAC9/4E2A0D?text=No+Image'} alt={article.title} className="w-full h-52 object-cover" />
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
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full text-lg">No news articles could be found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Members Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: boneColor }}>
        <div className="container mx-auto">
          <SectionHeading>BOARD MEMBERS</SectionHeading>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-gray-800 mt-6 mb-12">
            Meet the dedicated team behind Anurag EM School, committed to nurturing young minds and fostering a vibrant learning community.
          </p>
          <div className="flex flex-wrap justify-center -m-4">
            {/* Member Cards */}
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752948517/66c066c9-fd42-49ee-93a3-1f9ebed02d76_kvfdop.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Mr Peter </h3>
                  <p className="text-gray-600 mb-3 font-medium">CHAIRMAN</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Unwavering dedication fosters a thriving learning environment, consistently prioritizing student success and community growth.</p>
                </div>
              </div>
            </div>
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752999058/_DSC0355_Original_iet2am.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Mrs Kumari</h3>
                  <p className="text-gray-600 mb-3 font-medium">PRINCIPAL</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Ensuring a well-structured and effective learning experience for all students by overseeing curriculum development and academic programs.</p>
                </div>
              </div>
            </div>
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752999348/9471553b-e2e8-40ec-ba16-2a0d16e127a9_m59o1t.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Mr DOMINIC</h3>
                  <p className="text-gray-600 mb-3 font-medium">TREASURER</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Providing guidance and support to help students thrive emotionally and socially, fostering a positive and inclusive school environment.</p>
                </div>
              </div>
            </div>
            <div className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <div className="h-full flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                <img alt="team" className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center mb-6 border-4 border-gray-200 shadow-sm" src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1752999056/1f391b37-9b2a-4f68-adfa-42ef924c77d5_oreomh.jpg"/>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Mr JOSEPH</h3>
                  <p className="text-gray-600 mb-3 font-medium">TREASURER</p>
                  <p className="mb-4 text-gray-700 text-sm leading-relaxed">Providing guidance and support to help students thrive emotionally and socially, fostering a positive and inclusive school environment.</p>
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
