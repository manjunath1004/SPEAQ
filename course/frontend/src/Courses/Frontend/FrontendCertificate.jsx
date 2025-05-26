import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FrontendCertificate = () => {
  const [nameInput, setNameInput] = useState('');
  const [studentName, setStudentName] = useState('');
  const [certificateVisible, setCertificateVisible] = useState(false);
  const certificateRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerate = () => {
    if (nameInput.trim() === '') return;
    setStudentName(nameInput.trim());
    setCertificateVisible(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleGenerate();
  };

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
    <div className="flex flex-col items-center justify-center mt-10 py-10 px-4 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">
      {!certificateVisible && (
        <div className="text-center bg-white p-6 rounded-xl shadow-md mb-8 w-full max-w-xl border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🖊️ Enter Your Name</h2>
          <p className="text-gray-700 mb-4">
            Please enter the name you'd like to appear on the certificate.
          </p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="px-4 py-2 w-full rounded-md border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., John Doe"
          />
          <button
            onClick={handleGenerate}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Certificate
          </button>
        </div>
      )}

      {certificateVisible && (
        <>
          <div
            ref={certificateRef}
            className="w-[1000px] h-[700px] bg-white rounded-xl border-4 border-blue-500 shadow-2xl p-10 relative flex flex-col items-center justify-center"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <img src="/SpeaQ.png" alt="Logo" className="absolute top-10 left-10 w-24 opacity-80" />

            <h1 className="text-5xl font-extrabold text-blue-700 mb-2">Certificate of Completion</h1>
            <p className="text-lg text-gray-700 mb-4 italic">This certificate is proudly presented to</p>

            <h2 className="text-4xl font-semibold text-gray-900 underline decoration-blue-400 decoration-2 mb-2">
              {studentName}
            </h2>

            <p className="text-lg text-gray-800 mt-2 mb-4">For successfully completing the course</p>
            <h3 className="text-2xl font-medium text-blue-800 mb-6">Frontend Development</h3>

            <p className="text-base text-gray-600 text-center px-10 mb-12">
              We recognize your dedication, learning, and passion demonstrated during this program.
              Congratulations and best wishes for your future endeavors!
            </p>

            <div className="absolute bottom-10 left-0 right-0 px-16 flex justify-between items-end">
              <div className="text-center">
                <div className="border-t border-gray-500 w-48 mx-auto mb-2"></div>
                <p className="text-sm text-gray-700">Instructor Signature</p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-1 text-gray-700">{new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">Date</p>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 text-xs text-gray-400">
              Cert-ID: #{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-10 px-6 py-3 bg-blue-700 text-white text-lg rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
          >
            Download Certificate
          </button>
        </>
      )}
    </div>
  );
};

export default FrontendCertificate;
