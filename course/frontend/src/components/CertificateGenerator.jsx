import React from "react";
import jsPDF from "jspdf";

const CertificateGenerator = ({ completedCourses }) => {
  const generateCertificate = () => {
    const doc = new jsPDF();

    // Add Certificate Title
    doc.setFontSize(24);
    doc.text("Course Completion Certificate", 105, 40, null, null, "center");

    // Add Recipient Name (change to dynamic user name)
    doc.setFontSize(18);
    doc.text("Congratulations!", 105, 60, null, null, "center");

    // Add Completed Courses List
    doc.setFontSize(14);
    doc.text("You have successfully completed the following courses:", 20, 80);

    completedCourses.forEach((course, index) => {
      doc.text(`${index + 1}. ${course}`, 20, 90 + index * 10);
    });

    // Add Completion Date
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120 + completedCourses.length * 10);

    // Save the PDF
    doc.save("Course_Completion_Certificate.pdf");
  };

  return (
    <div className="mt-6">
      <button
        onClick={generateCertificate}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Generate Certificate
      </button>
    </div>
  );
};

export default CertificateGenerator;
