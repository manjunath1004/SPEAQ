import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./components/ResumeUpload";
import IntroPage from "./pages/IntroPage";
import Contact from "./components/Contact";
import FAQs from "./components/FAQs";
import About from "./components/About";
import AptitudeTest from "./Aptitude/AptitudeTest";
import TandP from "./components/TandP";
import Support from "./components/Support";
import Careers from "./components/Careers";
import Mockinterview from "./components/Mockinterview";
import Certificate from "./components/Certificate";
import LearningCourses from "./Courses/LearningCourses";
import Frontend from "./Courses/Frontend/Frontend.jsx";
import HTML from "./Courses/Frontend/HTML.jsx";
import CSS from "./Courses/Frontend/CSS.jsx";
import JAVASCRIPT from "./Courses/Frontend/JAVASCRIPT.jsx";
import Java from "./Courses/Backend/Java.jsx";
import Terminal from "./Courses/Terminal";
import Basic from "./Aptitude/Basic.jsx";
import Intermediate from "./Aptitude/Intermediate";
import Advance from "./Aptitude/Advance";
import Footer from "./components/Footer";
import AptitudeHome from "./Aptitude/AptitudeHome"; // New component for level selection
import AptitudeTestPage from "./Aptitude/AptitudeTestPage"; // New component for the actual test
import TechnicalInterview from "./TechnicalInterview/page.jsx"; // Assuming this is the correct path for the Technical Interview component
import ContactUs from "./components/ContactUs";
import HrInterviewPage from "./HrInterview/page.jsx";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeUploadRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          setShowSignIn={setShowSignIn} 
          setShowSignUp={setShowSignUp}
          triggerResumeUpload={() => resumeUploadRef.current?.()} 
        />

        <div className="flex-grow flex flex-col">
          <Routes>
            /* Public Routes */
            <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/TandP" element={<TandP />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Mockinterview" element={<Mockinterview />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/LearningCourses" element={<LearningCourses />} />
            <Route path="/Frontend" element={<Frontend />} />
            <Route path="/HTML" element={<HTML />} />
            <Route path="/CSS" element={<CSS />} />
            <Route path="/JAVASCRIPT" element={<JAVASCRIPT />} />
            <Route path="/Java" element={<Java />} />
            <Route path="/Terminal" element={<Terminal />} />
            
            /* Updated Aptitude Test Routes */
            <Route path="/aptitude-test" element={<AptitudeHome />} />
            <Route path="/aptitude-test/:level" element={<AptitudeTestPage />} />
            
            /* Legacy routes (keep for backward compatibility if needed) */
            <Route path="/AptitudeTest" element={<Navigate to="/aptitude-test" replace />} />
            <Route path="/Basic" element={<Navigate to="/aptitude-test/Basic" replace />} />
            <Route path="/Intermediate" element={<Navigate to="/aptitude-test/intermediate" replace />} />
            <Route path="/Advance" element={<Navigate to="/aptitude-test/advanced" replace />} />
            <Route path="/TechnicalInterview" element={<TechnicalInterview />} />        
            <Route path="/HrInterview" element={<HrInterviewPage />} />
            /* Protected Routes */
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/upload" 
              element={user ? <ResumeUpload resumeUploadRef={resumeUploadRef} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>

        <Footer />

        {showSignIn && (
          <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
        {showSignUp && (
          <SignUpPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />
        )}
      </div>
    </Router>
  );
};