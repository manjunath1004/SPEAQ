



import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AptitudeTestPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [levelScores, setLevelScores] = useState({
    basic: null,
    intermediate: null,
    advanced: null
  });
  const [showFinalResult, setShowFinalResult] = useState(false);

  const fetchQuestions = useCallback(async (requestedLevel) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/questions/${requestedLevel}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid data format received');

      setQuestions(data);
      setUserAnswers(new Array(data.length).fill(null));
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setScore(0);
      setTimeLeft(600);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load questions. Please try again later.');
      navigate('/aptitude-test');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchQuestions(level);
  }, [fetchQuestions, level]);

  const handleSubmit = useCallback(() => {
    const finalScore = questions.reduce((total, q, index) => {
      const correctAnswerText = q.options[q.answer];
      return total + (userAnswers[index] === correctAnswerText ? 1 : 0);
    }, 0);

    setScore(finalScore);
    setIsSubmitted(true);
    setLevelScores(prev => ({
      ...prev,
      [level]: {
        score: finalScore,
        total: questions.length,
        percentage: Math.round((finalScore / questions.length) * 100)
      }
    }));
  }, [questions, userAnswers, level]);

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
    }

    const timer = timeLeft > 0 && !isSubmitted && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, handleSubmit]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(userAnswers[currentIndex + 1] || null);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(userAnswers[currentIndex - 1] || null);
    } else {
      navigate('/aptitude-test');
    }
  };

  const proceedToNextLevel = () => {
    if (level === 'basic') {
      navigate('/aptitude-test/intermediate');
    } else if (level === 'intermediate') {
      navigate('/aptitude-test/advanced');
    } else if (level === 'advanced') {
      setShowFinalResult(true);
    }
  };

  const handleDoAgain = () => {
    fetchQuestions(level);
  };

  const handleRestartFromBasic = () => {
    // Reset all scores and start from basic level
    setLevelScores({
      basic: null,
      intermediate: null,
      advanced: null
    });
    setShowFinalResult(false);
    navigate('/aptitude-test/basic');
  };

  const handleCancelTest = () => {
    // Navigate back to home or any other appropriate route
    navigate('/');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLevelDisplayName = (level) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  if (isLoading) return <div className="text-center py-8">Loading questions...</div>;
  if (!questions.length) return <div className="text-center py-8">No questions available for this level</div>;

  if (showFinalResult) {
    const completedLevels = Object.entries(levelScores).filter(
      ([_, scoreData]) => scoreData !== null
    );

    const totalQuestions = completedLevels.reduce(
      (sum, [_, scoreData]) => sum + scoreData.total, 0
    );

    const totalScore = completedLevels.reduce(
      (sum, [_, scoreData]) => sum + scoreData.score, 0
    );

    const overallPercentage = Math.round((totalScore / totalQuestions) * 100);

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl mt-14">
        <h1 className="text-3xl font-bold text-center mb-8">Final Results</h1>
        
        <div className="space-y-6 mb-8">
          {levelScores.basic && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-blue-600">Basic Level</h2>
              <div className="flex justify-between mt-2">
                <span>Score: {levelScores.basic.score}/{levelScores.basic.total}</span>
                <span className="font-medium">{levelScores.basic.percentage}%</span>
              </div>
            </div>
          )}
          
          {levelScores.intermediate && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-green-600">Intermediate Level</h2>
              <div className="flex justify-between mt-2">
                <span>Score: {levelScores.intermediate.score}/{levelScores.intermediate.total}</span>
                <span className="font-medium">{levelScores.intermediate.percentage}%</span>
              </div>
            </div>
          )}
          
          {levelScores.advanced && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-red-600">Advanced Level</h2>
              <div className="flex justify-between mt-2">
                <span>Score: {levelScores.advanced.score}/{levelScores.advanced.total}</span>
                <span className="font-medium">{levelScores.advanced.percentage}%</span>
              </div>
            </div>
          )}
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-3">Overall Performance</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">Total Score</p>
                <p className="text-gray-600">{totalScore} out of {totalQuestions}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">Percentage</p>
                <p className={`text-2xl font-bold ${
                  overallPercentage >= 70 ? 'text-green-600' : 
                  overallPercentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {overallPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          {overallPercentage > 75 ? (
            <button
              onClick={() => navigate('/technical-round')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Proceed to Technical Round
            </button>
          ) : (
            <button
              onClick={handleRestartFromBasic}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Restart Aptitude Test
            </button>
          )}
          <button
            onClick={handleCancelTest}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Cancel Test
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl mt-14">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold capitalize">{level} Level</h1>
        <div className="text-xl font-semibold bg-red-100 px-4 py-2 rounded-lg">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {isSubmitted ? (
        <div className="text-center mb-8">
          <div className="mt-4 text-green-600 font-medium text-lg">
            <p>{getLevelDisplayName(level)} Level completed! You scored {score} out of {questions.length}.</p>
            <p className="text-xl font-bold mt-2">
              {Math.round((score / questions.length) * 100)}%
            </p>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleDoAgain}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Do Again
              </button>
              
              {level === 'advanced' ? (
                <button
                  onClick={() => setShowFinalResult(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  View Final Results
                </button>
              ) : (
                <button
                  onClick={proceedToNextLevel}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  {level === 'basic' ? 'Next: Intermediate Level' : 'Next: Advanced Level'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left p-3 rounded-lg border ${
                    selectedOption === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700"
            >
              {currentIndex === 0 ? 'Cancel Test' : 'Previous'}
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`rounded-lg px-6 py-2 ${
                  selectedOption
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AptitudeTestPage;




