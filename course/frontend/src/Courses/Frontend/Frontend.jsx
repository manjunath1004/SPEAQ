import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningCourses = () => {
  const courseData = {
    html: {
      title: "HTML Fundamentals",
      description: "Master the building blocks of web development",
      icon: "📄",
      pages: [
        {
          title: "Introduction to HTML",
          content: "HTML (HyperText Markup Language) is the foundation of all web development. It provides the structural framework for web pages by using a system of tags and attributes. HTML documents are interpreted by web browsers to display content including text, images, videos, and other multimedia elements. The language was first developed by Tim Berners-Lee in 1991 and has evolved through several versions, with HTML5 being the current standard. HTML works alongside CSS for styling and JavaScript for interactivity to create modern websites. Learning HTML is essential for any web developer as it forms the backbone of all web content. The language uses semantic elements to describe the meaning of content rather than just its appearance, which improves accessibility and SEO.",
          tips: [
            "All HTML documents must start with <!DOCTYPE html>",
            "The <html> tag is the root element of an HTML page",
            "Use semantic elements like <header>, <nav>, and <footer> for better accessibility"
          ],
          quiz: {
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "Hyperlinks and Text Markup Language",
              "Home Tool Markup Language"
            ],
            answer: "Hyper Text Markup Language"
          },
          nextCourse: 'css'
        },
        {
          title: "HTML Elements and Tags",
          content: "HTML elements are the fundamental components that structure web content. Each element consists of opening and closing tags that surround content, with some exceptions like <img> which are self-closing. Common elements include headings (<h1> to <h6>), paragraphs (<p>), links (<a>), and images (<img>). Attributes provide additional information about elements, such as href for links or src for images. Block-level elements like <div> create distinct sections, while inline elements like <span> style portions of text. HTML5 introduced semantic elements such as <article>, <section>, and <aside> that better describe content structure. Understanding these elements is crucial for creating well-organized, accessible web pages that work across different devices and browsers.",
          tips: [
            "<h1> to <h6> define headings of different levels",
            "The <a> tag defines hyperlinks using the href attribute",
            "<img> tags should always include alt text for accessibility"
          ],
          quiz: {
            question: "Which tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>"],
            answer: "<a>"
          }
        },
        {
          title: "HTML Forms and Tables",
          content: "HTML forms are essential for collecting user input and submitting data to servers. They contain various input elements like text fields, checkboxes, radio buttons, and dropdown menus. The <form> element wraps all inputs and specifies where and how to send data using action and method attributes. Tables display tabular data using <table>, <tr> (table row), <td> (table data), and <th> (table header) elements. While forms and tables are powerful tools, they should be used appropriately - forms for data collection and tables for structured data presentation. Modern HTML5 introduced new input types like email, date, and color pickers that provide better user experience and validation. Properly structured forms and tables enhance accessibility and usability across all devices.",
          tips: [
            "Always include <label> elements for form accessibility",
            "Use <table> only for tabular data, not for layout",
            "Form elements should have name attributes for server-side processing"
          ],
          quiz: {
            question: "Which attribute is used to specify where to send form data?",
            options: ["method", "action", "target"],
            answer: "action"
          }
        }
      ],
      nextCourse: 'css'
    },
    css: {
      title: "CSS Styling",
      description: "Bring your web pages to life with beautiful styles",
      icon: "🎨",
      pages: [
        {
          title: "Introduction to CSS",
          content: "CSS (Cascading Style Sheets) is a stylesheet language that controls the visual presentation of HTML documents. It separates content from design, allowing developers to create consistent styling across multiple pages. CSS works by selecting HTML elements and applying properties like color, font, spacing, and layout. The 'cascade' refers to how styles combine and override each other based on specificity and source order. CSS can be applied through inline styles, internal style sheets, or external .css files (the preferred method). Modern CSS includes powerful features like variables, animations, and responsive design tools. Learning CSS is essential for creating visually appealing websites that adapt to different screen sizes and devices. The current version, CSS3, introduced modules that add capabilities like flexbox, grid layout, and advanced visual effects.",
          tips: [
            "CSS can be applied inline, internally, or via external stylesheets",
            "External stylesheets are preferred for maintainability",
            "The 'cascade' determines which styles get applied when rules conflict"
          ],
          quiz: {
            question: "Which CSS property controls text color?",
            options: ["font-color", "text-color", "color"],
            answer: "color"
          }
        },
        {
          title: "CSS Selectors and Specificity",
          content: "CSS selectors are patterns used to select and style HTML elements. They range from simple element selectors (like 'p') to complex attribute selectors. Class selectors (prefixed with .) and ID selectors (prefixed with #) provide more targeted styling options. Specificity determines which CSS rules are applied when multiple rules target the same element - calculated based on selector type, IDs, classes, and element types. The !important rule overrides all specificity but should be used sparingly. Understanding specificity is crucial for managing large stylesheets and avoiding styling conflicts. Pseudo-classes (like :hover) and pseudo-elements (like ::before) provide additional targeting capabilities. Modern CSS preprocessors like Sass extend selector functionality with nesting and other powerful features.",
          tips: [
            "Class selectors (.) are more specific than element selectors",
            "ID selectors (#) are more specific than class selectors",
            "!important overrides all other specificity rules (use sparingly)"
          ],
          quiz: {
            question: "Which selector has the highest specificity?",
            options: ["div", ".class", "#id"],
            answer: "#id"
          }
        },
        {
          title: "CSS Layout and Flexbox",
          content: "CSS provides multiple layout systems including normal flow, floats, positioning, flexbox, and grid. The box model (content, padding, border, margin) is fundamental to all layouts. Flexbox (Flexible Box Layout) revolutionized one-dimensional layouts by providing efficient alignment and distribution of space. Key flexbox properties include display: flex, flex-direction, justify-content, and align-items. Flexbox simplifies responsive design by allowing elements to grow, shrink, and wrap as needed. Understanding the box model and flexbox is essential for creating modern, responsive layouts. CSS Grid provides two-dimensional layout capabilities that complement flexbox. These tools have largely replaced older layout techniques like tables and floats for page structure.",
          tips: [
            "box-sizing: border-box includes padding in element width",
            "Flexbox is ideal for one-dimensional layouts",
            "Use margin: auto to center elements horizontally"
          ],
          quiz: {
            question: "Which property enables flexbox layout?",
            options: ["display: flex", "layout: flex", "flex: true"],
            answer: "display: flex"
          }
        }
      ],
      nextCourse: 'javascript'
    },
    javascript: {
      title: "JavaScript Programming",
      description: "Add interactivity to your websites",
      icon: "💻",
      pages: [
        {
          title: "JavaScript Basics",
          content: "JavaScript is a versatile programming language that enables dynamic interactivity on web pages. It runs in the browser and can manipulate the Document Object Model (DOM) to create responsive user interfaces. JavaScript is a high-level, interpreted language that supports multiple programming paradigms including object-oriented, functional, and event-driven programming. The language has evolved significantly since its creation in 1995, with ES6 (ECMAScript 2015) introducing major improvements like let/const, arrow functions, and classes. JavaScript works with HTML and CSS to create complete web applications. Modern JavaScript includes features like modules, promises, and async/await for handling asynchronous operations. Learning JavaScript fundamentals is essential for front-end development and increasingly important for back-end development through Node.js.",
          tips: [
            "Variables can be declared with let, const, or var (prefer const)",
            "JavaScript is case sensitive",
            "Use console.log() for debugging"
          ],
          quiz: {
            question: "Which method selects an element by its ID?",
            options: [
              "document.querySelector()",
              "document.getElementById()",
              "document.getElementByClass()"
            ],
            answer: "document.getElementById()"
          }
        },
        {
          title: "Functions and Events",
          content: "Functions in JavaScript are first-class objects that can be assigned to variables, passed as arguments, and returned from other functions. They encapsulate reusable blocks of code and can be declared using function declarations, function expressions, or arrow syntax. Events are actions or occurrences that happen in the browser, such as clicks, key presses, or page loads. JavaScript can listen for these events using addEventListener() and execute functions in response. Understanding functions and events is crucial for creating interactive web applications. Modern JavaScript provides powerful event handling capabilities including event delegation and custom events. Asynchronous programming patterns like callbacks, promises, and async/await often involve functions responding to events or completed operations.",
          tips: [
            "Arrow functions have shorter syntax and lexical this binding",
            "addEventListener() is preferred over inline event handlers",
            "Functions can be passed as arguments to other functions"
          ],
          quiz: {
            question: "Which keyword declares a function?",
            options: ["function", "def", "func"],
            answer: "function"
          }
        },
        {
          title: "DOM Manipulation",
          content: "The Document Object Model (DOM) is a programming interface that represents HTML documents as a tree structure of objects. JavaScript can interact with the DOM to dynamically change content, structure, and styles. Common DOM manipulation methods include getElementById(), querySelector(), createElement(), and appendChild(). Event listeners can be attached to DOM elements to create interactive experiences. Efficient DOM manipulation is crucial for performance, as excessive updates can cause browser reflows. Modern frameworks like React and Vue abstract much of the direct DOM manipulation, but understanding the underlying concepts remains important. The DOM also provides APIs for working with forms, styles, animations, and browser history. Mastering DOM manipulation is essential for creating dynamic, single-page applications.",
          tips: [
            "Cache DOM elements in variables for better performance",
            "innerHTML is powerful but can be a security risk",
            "Use textContent instead of innerText for better performance"
          ],
          quiz: {
            question: "Which method adds a new element to the DOM?",
            options: [
              "document.createElement()",
              "element.appendChild()",
              "Both of the above"
            ],
            answer: "Both of the above"
          }
        }
      ],
      nextCourse: null
    }
  };
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedCourses, setCompletedCourses] = useState({
    html: false,
    css: false,
    javascript: false
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [quizState, setQuizState] = useState({
    userAnswer: null,
    isCorrect: false,
    showFeedback: false
  });
  const [progress, setProgress] = useState({
    html: 0,
    css: 0,
    javascript: 0
  });
  const navigate = useNavigate();

  // Reset quiz state when page changes
  useEffect(() => {
    setQuizState({
      userAnswer: null,
      isCorrect: false,
      showFeedback: false
    });
  }, [currentPage, selectedCourse]);

  const handleCourseSelect = (courseKey) => {
    // Enforce course progression
    if (courseKey === 'css' && !completedCourses.html) {
      return;
    }
    if (courseKey === 'javascript' && (!completedCourses.html || !completedCourses.css)) {
      return;
    }
    
    setSelectedCourse(courseKey);
    setCurrentPage(0);
    setShowCompletionModal(false);
  };

  const navigatePage = (direction) => {
    if (direction === 'next') {
      // Check if there's a quiz on this page and if it's been answered correctly
      const hasQuiz = courseData[selectedCourse].pages[currentPage].quiz;
      const canProceed = !hasQuiz || (hasQuiz && quizState.isCorrect);

      if (!canProceed) {
        // Show feedback if user tries to proceed without answering correctly
        if (hasQuiz && !quizState.showFeedback) {
          setQuizState(prev => ({
            ...prev,
            showFeedback: true
          }));
        }
        return;
      }

      if (currentPage < courseData[selectedCourse].pages.length - 1) {
        setCurrentPage(prev => prev + 1);
        updateProgress(selectedCourse, currentPage + 1);
      } else {
        completeCurrentCourse();
      }
    } else {
      if (currentPage > 0) setCurrentPage(prev => prev - 1);
    }
  };

  const updateProgress = (courseKey, pageIndex) => {
    const totalPages = courseData[courseKey].pages.length;
    const newProgress = Math.min(Math.floor((pageIndex / totalPages) * 100), 100);
    setProgress(prev => ({
      ...prev,
      [courseKey]: newProgress
    }));
  };

  const completeCurrentCourse = () => {
    setCompletedCourses(prev => ({
      ...prev,
      [selectedCourse]: true
    }));
    setProgress(prev => ({
      ...prev,
      [selectedCourse]: 100
    }));

    const nextCourse = courseData[selectedCourse].nextCourse;
    if (nextCourse) {
      setSelectedCourse(nextCourse);
      setCurrentPage(0);
    } else {
      setShowCompletionModal(true);
    }
  };

  const handleQuizAnswer = (answer) => {
    const correctAnswer = courseData[selectedCourse].pages[currentPage].quiz.answer;
    const isCorrect = answer === correctAnswer;

    setQuizState({
      userAnswer: answer,
      isCorrect,
      showFeedback: true
    });
  };

  const resetCourseSelection = () => {
    setSelectedCourse(null);
    setCurrentPage(0);
    setShowCompletionModal(false);
  };

  const currentCourse = selectedCourse ? courseData[selectedCourse] : null;
  const pageData = currentCourse ? currentCourse.pages[currentPage] : null;
  const isLastPage = currentCourse && currentPage === currentCourse.pages.length - 1;
  const hasQuiz = pageData?.quiz;
  const canProceed = !hasQuiz || (hasQuiz && quizState.isCorrect);

  // Check if course is locked based on prerequisites
  const isCourseLocked = (courseKey) => {
    if (courseKey === 'html') return false;
    if (courseKey === 'css') return !completedCourses.html;
    if (courseKey === 'javascript') return !completedCourses.html || !completedCourses.css;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 mt-12">Learning Path</h1>
          <p className="text-xl text-gray-600">Master web development step by step</p>
        </div>

        {/* Course Selection Cards */}
        {!selectedCourse && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(courseData).map(([key, course]) => (
              <div 
                key={key}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer border-2 ${
                  completedCourses[key] 
                    ? 'border-green-500' 
                    : isCourseLocked(key)
                      ? 'border-gray-200 opacity-75'
                      : 'border-white'
                }`}
                onClick={() => !isCourseLocked(key) && handleCourseSelect(key)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{course.icon}</span>
                    <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                    {isCourseLocked(key) && (
                      <span className="ml-auto text-gray-400">🔒</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${progress[key]}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {completedCourses[key] 
                        ? 'Completed' 
                        : isCourseLocked(key)
                          ? 'Complete previous courses'
                          : `${progress[key]}% complete`}
                    </span>
                    {completedCourses[key] && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Content */}
        {selectedCourse && !showCompletionModal && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentCourse.title}
                  </h2>
                  <p className="text-gray-600">
                    Page {currentPage + 1} of {currentCourse.pages.length}
                  </p>
                </div>
                <button
                  onClick={resetCourseSelection}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Change Course
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {pageData.title}
                </h3>
                <div className="prose max-w-none text-gray-700 mb-6">
                  <p>{pageData.content}</p>
                </div>

                {pageData.tips && pageData.tips.length > 0 && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <h4 className="font-medium text-blue-800 mb-2">Key Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      {pageData.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quiz Section */}
              {pageData.quiz && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Quiz
                  </h4>
                  <p className="font-medium text-gray-700 mb-4">
                    {pageData.quiz.question}
                  </p>
                  <div className="space-y-3">
                    {pageData.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizState.showFeedback
                            ? option === pageData.quiz.answer
                              ? 'border-green-500 bg-green-50'
                              : quizState.userAnswer === option && !quizState.isCorrect
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-300'
                            : quizState.userAnswer === option
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {quizState.showFeedback && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      quizState.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {quizState.isCorrect 
                        ? '✅ Correct! Well done.' 
                        : '❌ Not quite right. Try again!'}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => navigatePage('prev')}
                  disabled={currentPage === 0}
                  className={`px-5 py-2 rounded-lg ${
                    currentPage === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => navigatePage('next')}
                  className={`px-5 py-2 rounded-lg transition ${
                    canProceed
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-300 text-white cursor-not-allowed'
                  }`}
                >
                  {isLastPage 
                    ? currentCourse.nextCourse 
                      ? 'Next Course' 
                      : 'Complete Course' 
                    : 'Next Page'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completion Modal */}
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Congratulations!
                </h3>
                <p className="text-gray-600 mb-6">
                  You've completed all available courses. You're now ready to build amazing web projects!
                </p>
                <div className="flex gap-4">
                  <button  
                    onClick={() => {
                      setShowCompletionModal(false);
                      resetCourseSelection();
                      navigate("/FrontendCertificate");
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md"
                  >
                    Get Certificate
                  </button>
                  <button
                    onClick={() => {
                      setShowCompletionModal(false);
                      resetCourseSelection();
                      navigate("/LearningCourses");
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md"
                  >
                    Return to Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningCourses;