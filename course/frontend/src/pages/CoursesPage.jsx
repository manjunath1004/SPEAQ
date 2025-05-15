// src/pages/CoursesPage.jsx

import { useState } from "react";
import CourseCompletionCertificate from "../components/CourseCompletionCertificate";

const CoursesPage = () => {
  const [completedCourses, setCompletedCourses] = useState([]);

  const handleCompleteCourse = (course) => {
    if (!completedCourses.includes(course)) {
      setCompletedCourses([...completedCourses, course]);
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <div>
        <h2>Frontend</h2>
        <button onClick={() => handleCompleteCourse("HTML")}>Complete HTML</button>
        <button onClick={() => handleCompleteCourse("CSS")}>Complete CSS</button>
        <button onClick={() => handleCompleteCourse("JavaScript")}>Complete JavaScript</button>
      </div>
      <div>
        <h2>Backend</h2>
        <button onClick={() => handleCompleteCourse("Python")}>Complete Python</button>
        <button onClick={() => handleCompleteCourse("Django")}>Complete Django</button>
      </div>

      <CourseCompletionCertificate completedCourses={completedCourses} />
    </div>
  );
};

export default CoursesPage;
