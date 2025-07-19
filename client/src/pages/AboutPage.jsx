import React from 'react';

// You can use these icons or replace them with SVGs if you prefer
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">About SriChaitanya School</h1>
          <p className="text-lg text-gray-600 mt-4">A tradition of academic excellence and holistic development.</p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Mission */}
          <div className="text-center p-8">
            <div className="flex justify-center mb-4">
              <MissionIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide a nurturing and challenging environment where students can achieve their full academic potential and develop into responsible, ethical, and compassionate global citizens.
            </p>
          </div>

          {/* Our Vision */}
          <div className="text-center p-8">
            <div className="flex justify-center mb-4">
              <VisionIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be a leading educational institution recognized for innovation, academic rigor, and for inspiring a lifelong love of learning in our students, preparing them to lead and succeed in a dynamic world.
            </p>
          </div>
        </div>
      </div>

      {/* School History Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our History</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 1986, SriChaitanya began with a singular focus on preparing students for competitive entrance exams. From our humble beginnings in Vijayawada, we have grown into a nationwide network of schools, renowned for our disciplined approach and consistent results.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the decades, we have adapted to the changing educational landscape, integrating technology and modern pedagogical methods while staying true to our core values of hard work, integrity, and the pursuit of knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;