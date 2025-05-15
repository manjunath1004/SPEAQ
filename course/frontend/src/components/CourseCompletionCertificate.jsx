// CourseCompletionCertificate.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CourseCompletionCertificate = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedCourses = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Authentication Error:", authError);
        return;
      }
  
      console.log("Logged-in User:", user);
      if (!user) {
        console.error("User not logged in.");
        return;
      }
  
      const { data, error } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('completion_date', { ascending: false });
  
      if (error) {
        console.error("Error fetching completed courses:", error);
        return;
      }
  
      console.log("Fetched Courses:", data);
      setCompletedCourses(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (completedCourses.length === 0) {
    return <p>No completed courses found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Completed Courses</h2>
      {completedCourses.map((course) => (
        <div key={course.id} className="certificate-card p-4 mb-4 bg-white shadow rounded-md">
          <h3 className="text-lg font-semibold">{course.course_name}</h3>
          <p>Completion Date: {new Date(course.completion_date).toLocaleDateString()}</p>
          <button 
            onClick={() => downloadCertificate(course)} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Certificate
          </button>
        </div>
      ))}
    </div>
  );
};

// Example function for downloading certificate (To be enhanced)
const downloadCertificate = (course) => {
  // Replace with your certificate generation logic
  alert(`Downloading certificate for ${course.course_name}`);
};

export default CourseCompletionCertificate;
