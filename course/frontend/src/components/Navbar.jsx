import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setShowSignIn, setShowSignUp, triggerResumeUpload }) {
  // State Management
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for logout animation
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Fetch User Data on Mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { email, user_metadata } = user;
        const firstName = user_metadata?.firstName || "User";
        const lastName = user_metadata?.lastName || "";
        const avatar = user_metadata?.avatar_url || getPlaceholderAvatar(email);

        setUser({ email, firstName, lastName, avatar });
      }
    };

    fetchUser();

    // Auth State Listener
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) fetchUser();
      else setUser(null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  // Handle Logout with animation
  const handleLogout = async () => {
    setIsLoggingOut(true); // Start the animation
    setTimeout(async () => {
      await supabase.auth.signOut();
      setUser(null);
      setIsLoggingOut(false); // End the animation
      navigate("/"); // Navigate to home after logout
    }, 3000); // Keep the animation for 3 seconds
  };

  // Dashboard Navigation
  const handleDashboardClick = () => user ? navigate("/dashboard") : setShowSignIn(true);

  // Resume Upload Handling
  const handleUploadClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) triggerResumeUpload(file);
  };

  // Generate Placeholder Avatar
  const getPlaceholderAvatar = (email) => `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`;

  // Navbar JSX
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-blue-600 p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src="/SpeaQ.png" alt="SpeaQ Logo" className="h-10 ml-[-20px]" />
        </Link>

        <ul className="flex space-x-6 items-center">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          <li><button onClick={handleDashboardClick} className="text-white hover:text-gray-300">Dashboard</button></li>

          {user ? (
            <div className="relative">
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} referrerPolicy="no-referrer" />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <p className="text-center font-semibold text-gray-700">{user.firstName} {user.lastName}</p>
                  <button className="w-full text-left px-2 py-2 text-blue-600 hover:bg-gray-100 rounded" onClick={handleUploadClick}>Upload Resume</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <li><button onClick={() => setShowSignIn(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Sign In</button></li>
          )}
        </ul>
      </div>

      {/* Hidden File Input for Resume Upload */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />

      {/* Logout Animation - Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="spinner"></div>
            <p className="text-white mt-2 text-2xl">Logging out......</p>
          </div>
        </div>
      )}
    </nav>
  );
}
