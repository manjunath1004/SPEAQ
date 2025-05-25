import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CourseCompletionCertificate = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUserAndCourses = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) return console.error(userError);
    setUser(user);

    const { data, error } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed', true)
      .order('completion_date', { ascending: false });

    if (error) return console.error(error);
    setCompletedCourses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserAndCourses();
  }, []);

  const handleDownload = async (course) => {
    const fileName = `${user.id}_${course.course_name}.pdf`;

    // Check if file already exists in Supabase Storage
    const { data: existingFile } = await supabase
      .storage
      .from('certificates')
      .list('', { search: fileName });

    if (existingFile.length > 0) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('certificates')
        .getPublicUrl(fileName);

      // Redirect to download
      window.open(publicUrl, '_blank');
      return;
    }

    // Generate new certificate
    const pdfBlob = await generateCertificatePDF(user.user_metadata.full_name || "John Doe", course.course_name);
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('certificates')
      .upload(fileName, pdfBlob, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error", uploadError);
      return;
    }

    // Get public URL and open
    const { data: { publicUrl } } = supabase
      .storage
      .from('certificates')
      .getPublicUrl(fileName);

    window.open(publicUrl, '_blank');
  };

  if (loading) return <p>Loading...</p>;

  if (completedCourses.length === 0) return <p>No completed courses found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Certificates</h2>
      {completedCourses.map((course) => (
        <div key={course.id} className="p-4 mb-4 bg-white shadow rounded-md">
          <h3 className="text-lg font-semibold">{course.course_name}</h3>
          <p>Completed on: {new Date(course.completion_date).toLocaleDateString()}</p>
          <button
            onClick={() => handleDownload(course)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {/** Label changes if certificate already exists */}
            Redownload Certificate
          </button>
        </div>
      ))}
    </div>
  );
};

// Generate Certificate PDF (dummy logic here)
const generateCertificatePDF = async (name, courseName) => {
  const div = document.createElement('div');
  div.style.width = '1000px';
  div.style.height = '700px';
  div.style.padding = '50px';
  div.style.backgroundColor = 'white';
  div.style.fontFamily = 'Georgia, serif';
  div.innerHTML = `
    <h1 style="font-size: 36px; color: blue;">Certificate of Completion</h1>
    <p>This certifies that <strong>${name}</strong> completed the <strong>${courseName}</strong> course.</p>
    <p>Date: ${new Date().toLocaleDateString()}</p>
  `;

  document.body.appendChild(div);
  const canvas = await html2canvas(div);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('landscape', 'pt', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
  document.body.removeChild(div);
  return pdf.output('blob');
};

export default CourseCompletionCertificate;
