import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import SummaryAd from "../components/SummaryAd";
import ResumeUpload from "../components/ResumeUpload";

const Dashboard = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">AI-Powered Interview Practice Platform</h1>
      <p className="text-gray-600 mt-2 text-center">
        Master your interview skills with personalized AI feedback
      </p>

      {/* SummaryAd Component */}
      <div className="mt-6 w-full max-w-4xl px-4">
        <SummaryAd />
      </div>

      {/* Card Container */}
<div className="mt-8 w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Mock Interviews Card */}
  <div 
    className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
    onClick={() => navigate("/Mockinterview")}
  >
    <img src="/MockInterviewIcon.jpg" alt="Mock Interview Icon" className="w-16 h-16" />
    <h2 className="text-xl font-semibold mt-4">Mock Interviews</h2>
    <p className="text-gray-600 mt-2">
      Practice with our AI interviewer across aptitude, technical, and HR rounds
    </p>
    <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
      Take a mock interview
    </div>
  </div>

  {/* Learning Courses Card */}
  <div 
    className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
    onClick={() => navigate("/LearningCourses")}
  >
    <img src="/LearningCourses.jpg" alt="Learning Courses" className="w-16 h-16" />
    <h2 className="text-xl font-semibold mt-4">Learning Courses</h2>
    <p className="text-gray-600 mt-2">
      Access comprehensive courses to improve your skills
    </p>
    <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
      Explore learning courses
    </div>
  </div>
</div>


      {/* Resume Upload or Start Button */}
      <div className="mt-8 w-full max-w-md">
        {!resumeUploaded ? (
          <ResumeUpload onUpload={handleResumeUpload} />
        ) : (
          <button 
            className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full relative group"
            onClick={() => navigate("/start-interview")} // Navigate when clicked
          >
            Start Your Interview
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Begin AI interview session
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
