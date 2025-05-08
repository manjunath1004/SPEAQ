import { useState } from "react";
import jsPDF from "jspdf";

const Certificate = () => {
  const [isGenerated, setIsGenerated] = useState(false);

  // Function to generate the certificate PDF
  const generateCertificate = () => {
    const doc = new jsPDF();

    // Add certificate content
    doc.setFontSize(20);
    doc.text("Course Completion Certificate", 105, 50, null, null, "center");

    doc.setFontSize(16);
    doc.text("This certifies that", 105, 70, null, null, "center");

    doc.setFontSize(18);
    doc.text("John Doe", 105, 90, null, null, "center"); // Change name dynamically if needed

    doc.setFontSize(16);
    doc.text("has successfully completed the course", 105, 110, null, null, "center");

    doc.setFontSize(14);
    doc.text("Date of Completion: " + new Date().toLocaleDateString(), 105, 130, null, null, "center");

    // Save the PDF file
    doc.save("certificate.pdf");
    setIsGenerated(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Course Completion Certificate</h1>
      <p className="text-gray-600 mt-2 text-center">
        Earn a verifiable certificate upon successfully completing your courses.
      </p>

      {/* Certificate Box */}
      <div className="mt-16 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center w-full max-w-md">
        <img src="/CertificateIcon.jpg" alt="Certificate Icon" className="w-16 h-16" />
        <h2 className="text-lg font-semibold mt-4">Get Your Certificate</h2>
        <p className="text-gray-600 mt-2">
          Download and share your certificate after completing the course.
        </p>

        {/* Button to generate and download the certificate */}
        <button
          onClick={generateCertificate}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Generate Certificate
        </button>

        {isGenerated && <p className="mt-2 text-green-500">Certificate Generated!</p>}
      </div>
    </div>
  );
};

export default Certificate;