import React from 'react';

// You can use these icons or replace them with SVGs if you prefer
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

function AboutPage() {
  // Define Bone color
  const boneColor = '#E3DAC9'; // Hex: #E3DAC9, RGB: 227, 218, 201

  // Text colors that work well on Bone
  const darkTextColor = '#f40707ff'; // A dark gray for headings
  const mediumTextColor = '#000000ff'; // A slightly lighter gray for body text

  return (
    <div style={{ backgroundColor: boneColor }}> {/* Main container with Bone background */}
      {/* Page Header */}
      <div className="py-16" style={{ backgroundColor: boneColor }}> {/* Header with Bone background */}
        <div className="container mx-auto px-6 text-center">
          {/* Adjusted heading text size for better responsiveness */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: darkTextColor }}>About Anurag EM School</h1>
          <p className="text-base sm:text-lg mt-4" style={{ color: mediumTextColor }}>
           At Anurag EM School, our core mission is anchored in an unwavering commitment to each student's holistic growth and future readiness. We understand that education in the 21st century extends beyond rote learning, and thus, we are deeply dedicated to cultivating well-rounded individuals equipped for a dynamic world.
          </p>
          <p className="text-base sm:text-lg mt-4" style={{ color: mediumTextColor }}>
           Our commitment to students is multifaceted. Academically, we provide a challenging yet supportive environment, delivered by passionate and highly qualified educators who go beyond traditional teaching to ignite curiosity and foster 
           critical thinking. Beyond the classroom, we are committed to nurturing talent through a diverse range of co-curricular and extracurricular activities, from sports to arts, which are vital for developing leadership, teamwork, and creative expression
          </p>
          <p className="text-base sm:text-lg mt-4" style={{ color: mediumTextColor }}>
           We are dedicated to instilling strong values and character, guiding students to become responsible, ethical, and compassionate global citizens. Through personalized attention and a focus on individual strengths, Anurag EM School is committed to empowering every student to achieve their full potential, ensuring they are not only prepared for future academic and professional challenges 
           but also poised to make a positive impact on society.
          </p>
        






        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Mission */}
          <div className="text-center p-8 bg-white rounded-lg shadow-md"> {/* Keeping cards white for contrast/pop */}
            <div className="flex justify-center mb-4">
              <MissionIcon />
            </div>
            {/* Adjusted heading text size for better responsiveness */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: darkTextColor }}>Our Mission</h2>
            <p className="text-sm sm:text-base" style={{ color: mediumTextColor }}>
              To provide a nurturing and challenging environment where students can achieve their full academic potential and develop into responsible, ethical, and compassionate global citizens.
            </p>
          </div>

          {/* Our Vision */}
          <div className="text-center p-8 bg-white rounded-lg shadow-md"> {/* Keeping cards white for contrast/pop */}
            <div className="flex justify-center mb-4">
              <VisionIcon />
            </div>
            {/* Adjusted heading text size for better responsiveness */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: darkTextColor }}>Our Vision</h2>
            <p className="text-sm sm:text-base" style={{ color: mediumTextColor }}>
              To be a leading educational institution recognized for innovation, academic rigor, and for inspiring a lifelong love of learning in our students, preparing them to lead and succeed in a dynamic world.
            </p>
          </div>
        </div>
      </div>

      {/* School History Section */}
      <div className="py-20" style={{ backgroundColor: boneColor }}> {/* History section with Bone background */}
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Adjusted heading text size for better responsiveness */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: darkTextColor }}>More About Anurag EM School</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: mediumTextColor }}>
              Welcome to Anurag EM School, where every child's journey of discovery and growth is celebrated. Nestled in the heart of Eluru, Andhra Pradesh, our school is dedicated to providing a transformative educational experience that goes beyond textbooks.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: mediumTextColor }}>
              Academic Excellence: Anurag EM School is committed to delivering a high standard of academic instruction. Our curriculum is delivered by highly qualified and passionate educators who utilize modern pedagogical techniques to make learning relevant and exciting.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: mediumTextColor }}>
              Beyond the Classroom: Education at Anurag EM School extends far beyond classroom walls. We offer a wide array of co-curricular and extracurricular activities. These programs are integral to developing well-rounded individuals, fostering teamwork, leadership, creativity, and self-expression.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: mediumTextColor }}>
              Dedicated Faculty: Our strength lies in our dedicated team of educators who are not just teachers but mentors and facilitators. They are committed to providing personalized attention, guiding students, and inspiring them to reach new heights.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: mediumTextColor }}>
              Modern Facilities: Our campus boasts well-equipped computer labs, a vibrant library, spacious playgrounds, and smart classrooms.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: mediumTextColor }}>
              At Anurag EM School, we are committed to shaping the leaders and innovators of tomorrow, empowering them to make a positive impact on the world. We invite you to explore our website further or schedule a visit to experience the Anurag EM School difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;