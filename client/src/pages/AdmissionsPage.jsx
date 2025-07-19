import React, { useState } from 'react';
import { submitAdmission } from '../services/api';

function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    parentName: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Define Bone color
  const boneColor = '#E3DAC9'; // Hex: #E3DAC9, RGB: 227, 218, 201

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await submitAdmission(formData);
      setMessage('Application submitted successfully! We will contact you soon.');
      setIsError(false);
      setFormData({ studentName: '', dateOfBirth: '', parentName: '', email: '', phone: '' });
    } catch (error) {
      setMessage('Failed to submit application. Please try again.');
      setIsError(true);
      console.error("Submission error:", error);
    }
  };

  return (
    // Apply Bone color to the main container
    <div style={{ backgroundColor: boneColor }} className="min-h-screen py-12"> {/* Added min-h-screen to ensure background covers full height */}
      <div className="container mx-auto px-4">
        {/* Adjusted heading text color for better contrast on Bone background */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Admissions Form</h1> {/* text-gray-900 provides good contrast on Bone */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Online Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student's Full Name</label>
              <input type="text" name="studentName" id="studentName" value={formData.studentName} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">Parent's/Guardian's Name</label>
              <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Submit Application
              </button>
            </div>
          </form>
          {message && (
            <div className={`mt-6 p-4 rounded-md text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdmissionsPage;