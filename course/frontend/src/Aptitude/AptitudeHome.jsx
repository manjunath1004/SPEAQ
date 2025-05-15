import React from 'react';
import { useNavigate } from 'react-router-dom';

const AptitudeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 mt-10">Aptitude Test</h1>
      <p className="text-center text-gray-600 mb-8">
        This test consists of three levels: Basic, Intermediate, and Advanced. Complete all to unlock the Technical round.
      </p>
      <div className="max-w-md mx-auto space-y-4">
        <button 
          onClick={() => navigate('/aptitude-test/basic')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg mt-14"
        >
          Start the Aptitude Test
        </button>
      </div>
    </div>
  );
};

export default AptitudeHome;
