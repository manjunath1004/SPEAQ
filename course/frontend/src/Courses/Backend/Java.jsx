import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProgrammingCourses = () => {
  const courses = {
    Java: {
      title: 'Java Programming Masterclass',
      icon: '☕',
      description: 'Learn Java from basics to advanced concepts',
      pages: [
        {
          title: 'Introduction to Java',
          content: 'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.',
          tips: [
            'Java was originally developed by James Gosling at Sun Microsystems (now owned by Oracle)',
            'The latest versions are Java 20/21 (as of 2023)',
            'Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM)'
          ],
          quiz: {
            question: 'What does WORA stand for in Java?',
            options: [
              'Write Once, Run Anywhere',
              'Write One, Read All',
              'World Object Resource Allocation',
              'Web Oriented Runtime Architecture'
            ],
            correctAnswer: 'Write Once, Run Anywhere',
          }
        },
        {
          title: 'Java Syntax Basics',
          content: 'Java syntax is similar to C and C++, but has fewer low-level facilities than either. The syntax is verbose and strictly typed, which helps prevent many common programming errors. A basic Java program consists of classes containing methods, and methods contain statements.',
          tips: [
            'Every Java application must contain a main() method',
            'Java is case-sensitive - "MyClass" and "myclass" are different',
            'Class names should start with uppercase letter (PascalCase)',
            'Method names should start with lowercase letter (camelCase)'
          ],
          quiz: {
            question: 'Which of these is NOT a valid Java identifier?',
            options: ['myVariable', '_value', '3rdPlace', '$amount'],
            correctAnswer: '3rdPlace',
          }
        },
        {
          title: 'Variables and Data Types',
          content: 'Java is a statically-typed language, meaning all variables must be declared before they can be used. Java has two categories of data types: primitive (byte, short, int, long, float, double, boolean, char) and reference types (objects, arrays, Strings). Variables are containers for storing data values.',
          tips: [
            'Use final keyword to make a variable constant',
            'Local variables must be initialized before use',
            'Java 10 introduced var for local variable type inference',
            'Default values: 0 for numbers, false for boolean, null for objects'
          ],
          quiz: {
            question: 'Which data type would you use for a true/false value?',
            options: ['int', 'String', 'boolean', 'char'],
            correctAnswer: 'boolean',
          }
        },
        {
          title: 'Control Flow Statements',
          content: 'Java provides control flow statements that allow you to control the flow of your program\'s execution based on certain conditions. These include decision-making statements (if-then, if-then-else, switch), looping statements (for, while, do-while), and branching statements (break, continue, return).',
          tips: [
            'Use switch for multiple fixed value conditions',
            'Enhanced for loop (for-each) is great for arrays and collections',
            'Avoid deeply nested control structures when possible',
            'Ternary operator (?:) can simplify simple if-else statements'
          ],
          quiz: {
            question: 'Which loop is guaranteed to execute at least once?',
            options: ['for', 'while', 'do-while', 'enhanced for'],
            correctAnswer: 'do-while',
          }
        }
      ],
      nextCourse: 'Python',
    },
    Python: {
      title: 'Python Programming Mastery',
      icon: '🐍',
      description: 'Master Python programming from fundamentals',
      pages: [
        {
          title: 'Introduction to Python',
          content: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python emphasizes code readability with its notable use of significant whitespace. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.',
          tips: [
            'Python 2 was officially discontinued in 2020 - use Python 3',
            'The Zen of Python (import this) outlines Python design principles',
            'Python has a vast standard library (batteries included philosophy)',
            'Indentation (whitespace) is syntactically significant in Python'
          ],
          quiz: {
            question: 'Which of these is NOT a Python design principle?',
            options: [
              'Beautiful is better than ugly',
              'Explicit is better than implicit',
              'Fast is better than slow',
              'Readability counts'
            ],
            correctAnswer: 'Fast is better than slow',
          }
        },
        {
          title: 'Python Syntax Basics',
          content: 'Python has a clean, readable syntax that uses English keywords frequently where other languages use punctuation. Unlike many other languages, it uses indentation (whitespace) to delimit blocks of code. Python is dynamically typed, meaning you don\'t need to declare variable types. Variables are created when you first assign values to them.',
          tips: [
            'Use snake_case for variable and function names',
            'PEP 8 is Python\'s official style guide',
            'Comments start with # and docstrings use triple quotes',
            'Python uses colons (:) to start code blocks'
          ],
          quiz: {
            question: 'Which symbol is used for single-line comments in Python?',
            options: ['//', '#', '--', '/*'],
            correctAnswer: '#',
          }
        },
        {
          title: 'Variables and Data Types',
          content: 'Python is dynamically typed, meaning you don\'t need to declare variable types. The interpreter infers the type at runtime. Python has several built-in data types: numeric (int, float, complex), sequence (str, list, tuple), mapping (dict), set (set, frozenset), and boolean (bool). Variables are references to objects in memory.',
          tips: [
            'Use type() to check variable type',
            'Variables don\'t store values directly - they reference objects',
            'Python uses duck typing ("if it walks like a duck...")',
            'None is Python\'s null equivalent'
          ],
          quiz: {
            question: 'Which of these is mutable in Python?',
            options: ['tuple', 'str', 'list', 'int'],
            correctAnswer: 'list',
          }
        },
        {
          title: 'Control Flow and Functions',
          content: 'Python provides control flow statements including if/elif/else for conditional execution, for and while loops for iteration, and break/continue for loop control. Functions are defined using the def keyword. Python supports first-class functions, meaning functions can be passed as arguments, returned as values, and assigned to variables.',
          tips: [
            'Use range() with for loops for numerical iteration',
            'Functions can have default arguments (def func(arg=default))',
            '*args collects positional arguments, **kwargs collects keyword arguments',
            'Lambda functions are small anonymous functions'
          ],
          quiz: {
            question: 'Which keyword defines a function in Python?',
            options: ['function', 'def', 'fun', 'lambda'],
            correctAnswer: 'def',
          }
        }
      ],
      nextCourse: null,
    },
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedCourses, setCompletedCourses] = useState({
    Java: false,
    Python: false,
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [quizState, setQuizState] = useState({
    selectedAnswer: null,
    isCorrect: null,
    showFeedback: false
  });
  const [progress, setProgress] = useState({
    Java: 0,
    Python: 0
  });
  const navigate = useNavigate();

  // Reset quiz state when page changes
  useEffect(() => {
    setQuizState({
      selectedAnswer: null,
      isCorrect: null,
      showFeedback: false
    });
  }, [currentPage, selectedCourse]);

  const handleCourseSelect = (courseKey) => {
    // Only allow Python course selection if Java is completed
    if (courseKey === 'Python' && !completedCourses.Java) {
      return;
    }
    setSelectedCourse(courseKey);
    setCurrentPage(0);
    setShowCompletionModal(false);
  };

  const navigatePage = (direction) => {
    if (direction === 'next') {
      // Check if current page has a quiz and if it's been answered
      const hasQuiz = courses[selectedCourse].pages[currentPage].quiz;
      const quizAnswered = quizState.selectedAnswer !== null;
      
      if (hasQuiz && !quizAnswered) {
        // Show feedback to answer the quiz first
        setQuizState(prev => ({
          ...prev,
          showFeedback: true,
          isCorrect: false
        }));
        return;
      }

      if (currentPage < courses[selectedCourse].pages.length - 1) {
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
    const totalPages = courses[courseKey].pages.length;
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

    const nextCourse = courses[selectedCourse].nextCourse;
    if (nextCourse) {
      setSelectedCourse(nextCourse);
      setCurrentPage(0);
    } else {
      setShowCompletionModal(true);
    }
  };

  const handleQuizAnswer = (answer) => {
    const correctAnswer = courses[selectedCourse].pages[currentPage].quiz.correctAnswer;
    const isCorrect = answer === correctAnswer;
    
    setQuizState({
      selectedAnswer: answer,
      isCorrect,
      showFeedback: true
    });
  };

  const resetCourseSelection = () => {
    setSelectedCourse(null);
    setCurrentPage(0);
    setShowCompletionModal(false);
  };

  const currentCourse = selectedCourse ? courses[selectedCourse] : null;
  const pageData = currentCourse ? currentCourse.pages[currentPage] : null;
  const isLastPage = currentCourse && currentPage === currentCourse.pages.length - 1;
  const hasQuiz = pageData?.quiz;
  const quizAnswered = quizState.selectedAnswer !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 mt-12">Programming Courses</h1>
          <p className="text-xl text-gray-600">Master Java and Python programming</p>
        </div>

        {/* Course Selection Cards */}
        {!selectedCourse && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Object.entries(courses).map(([key, course]) => (
              <div 
                key={key}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer border-2 ${completedCourses[key] ? 'border-green-500' : 'border-white'} ${
                  key === 'Python' && !completedCourses.Java ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleCourseSelect(key)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{course.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                      <p className="text-gray-600">{course.description}</p>
                      {key === 'Python' && !completedCourses.Java && (
                        <p className="text-sm text-red-500 mt-1">Complete Java course first</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${progress[key]}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {completedCourses[key] ? 'Completed' : `${progress[key]}% complete`}
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
                            ? option === pageData.quiz.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : quizState.selectedAnswer === option && !quizState.isCorrect
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-300'
                            : quizState.selectedAnswer === option
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
                      quizState.isCorrect ? 'bg-green-100 text-green-800' : 
                      quizState.selectedAnswer ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quizState.isCorrect 
                        ? '✅ Correct! Well done.' 
                        : quizState.selectedAnswer
                          ? '❌ Not quite right. Try again!'
                          : '⚠️ Please answer the quiz to continue'}
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
                    hasQuiz && !quizAnswered
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
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
                  You've completed all available courses. You're now ready to build amazing projects!
                </p>
                <div className="space-y-3">
               <div className="flex gap-4">
  <button
    onClick={() => {
      setShowCompletionModal(false);
      resetCourseSelection();
      navigate("/BackendCertificate");
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

                  <button
                    onClick={() => {
                      setShowCompletionModal(false);
                      setCompletedCourses({ Java: false, Python: false });
                      setProgress({ Java: 0, Python: 0 });
                      setSelectedCourse('Java');
                      setCurrentPage(0);
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Start Over
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

export default ProgrammingCourses;