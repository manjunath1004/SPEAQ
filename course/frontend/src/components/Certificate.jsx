import React from "react";
import CourseCompletionCertificate from "./CourseCompletionCertificate";

const Certificate = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold">Certificate Section</h1>
      <p className="text-gray-600 mt-2 text-center">
        Complete your courses to unlock your certificate.
      </p>

      <CourseCompletionCertificate />
    </div>
  );
};

export default Certificate;
