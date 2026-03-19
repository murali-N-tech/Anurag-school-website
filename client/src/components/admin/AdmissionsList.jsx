import React, { useState, useEffect } from 'react';
import { getAdmissions } from '../../services/api';

function AdmissionsList() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const { data } = await getAdmissions();
        setAdmissions(data);
      } catch (error) {
        console.error("Failed to fetch admissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md"><h2 className="text-2xl font-semibold mb-4">Admission Applications</h2>{loading ? (<p>Loading applications...</p>) : (<div className="overflow-x-auto"><table className="min-w-full bg-white"><thead className="bg-gray-100"><tr><th className="py-2 px-4 border-b text-left">Student Name</th><th className="py-2 px-4 border-b text-left">Parent Name</th><th className="py-2 px-4 border-b text-left">Email</th><th className="py-2 px-4 border-b text-left">Phone</th><th className="py-2 px-4 border-b text-left">Status</th></tr></thead><tbody>{admissions.length > 0 ? admissions.map(app => (<tr key={app._id} className="hover:bg-gray-50"><td className="py-2 px-4 border-b">{app.studentName}</td><td className="py-2 px-4 border-b">{app.parentName}</td><td className="py-2 px-4 border-b">{app.email}</td><td className="py-2 px-4 border-b">{app.phone}</td><td className="py-2 px-4 border-b"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'Accepted' ? 'bg-green-100 text-green-800' : app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{app.status}</span></td></tr>)) : (<tr><td colSpan="5" className="py-4 px-4 text-center text-gray-500">No applications found.</td></tr>)}</tbody></table></div>)}</div>
  );
}
export default AdmissionsList;