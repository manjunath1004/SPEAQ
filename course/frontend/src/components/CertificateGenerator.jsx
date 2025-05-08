import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateGenerator = ({
  studentName = "John Doe",
  courseName = "Full Stack Web Development",
}) => {
  const certificateRef = useRef(null);

  const handleDownload = () => {
    html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${studentName}_certificate.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mb-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>

      {/* Certificate Layout */}
      <div
        ref={certificateRef}
        className="w-[900px] h-[600px] bg-white border border-gray-300 shadow-2xl p-12 flex flex-col items-center justify-center"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <img src="/logo.png" alt="Logo" className="w-28 h-auto mb-6" />

        <h1 className="text-4xl font-bold mb-2">Certificate of Completion</h1>
        <p className="text-lg mb-4">This is to certify that</p>

        <h2 className="text-3xl font-semibold text-blue-700 mb-2">{studentName}</h2>

        <p className="text-lg mb-4">has successfully completed the course</p>

        <h3 className="text-2xl font-medium text-gray-800 mb-6">{courseName}</h3>

        <p className="text-lg italic text-gray-600 mb-10">
          Congratulations on your achievement!
        </p>

        {/* Footer */}
        <div className="flex justify-between w-full px-16 mt-auto">
          <div className="text-center">
            <div className="border-t border-gray-400 w-40 mx-auto mb-1"></div>
            <p className="text-sm">Instructor Signature</p>
          </div>
          <div className="text-center">
            <p className="text-sm mb-1">{new Date().toLocaleDateString()}</p>
            <p className="text-sm">Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;