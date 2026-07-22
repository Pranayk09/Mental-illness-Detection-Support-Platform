import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressHeader } from './ProgressHeader';
import { QuestionCard } from './QuestionCard';
import { ResultView } from './ResultView';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const demographicQuestions = [
  { id: 1, text: 'Age', type: 'number' },
  { id: 2, text: 'Gender', type: 'radio', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }] },
  { id: 3, text: 'Marital Status', type: 'radio', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
  {
    id: 4,
    text: 'Educational Status',
    type: 'select',
    options: [
      { label: 'Illiterate', value: 1 },
      { label: 'Primary', value: 2 },
      { label: 'SSC', value: 3 },
      { label: 'HSC', value: 4 },
      { label: 'Graduation and above', value: 5 },
    ],
  },
  {
    id: 5,
    text: 'Occupational Status',
    type: 'select',
    options: [
      { label: 'Housewife', value: 1 },
      { label: 'Service', value: 2 },
      { label: 'Business', value: 3 },
      { label: 'Student', value: 4 },
      { label: 'Day labor', value: 5 },
      { label: 'Unemployed', value: 6 },
    ],
  },
  {
    id: 6,
    text: 'Sleeping problem',
    type: 'radio',
    options: [
      { label: 'No', value: 0 },
      { label: 'Yes', value: 1 },
    ],
  },
];

const dassOptions = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Almost Always', value: 3 },
];

const dassQuestions = [
  'I found it hard to wind down',
  'I was aware of dryness of my mouth',
  'I couldn’t seem to experience any positive feeling at all',
  'I experienced breathing difficulty',
  'I found it difficult to work up the initiative to do things',
  'I tended to over-react to situations',
  'I experienced trembling (eg, in the hands)',
  'I felt that I was using a lot of nervous energy',
  'I was worried about situations in which I might panic',
  'I felt that I had nothing to look forward to',
  'I found myself getting agitated',
  'I found it difficult to relax',
  'I felt down-hearted and blue',
  'I was intolerant of anything that kept me from getting on with what I was doing',
  'I felt I was close to panic',
  'I was unable to become enthusiastic about anything',
  'I felt I wasn’t worth much as a person',
  'I felt that I was rather touchy',
  'I was aware of the action of my heart in the absence of physical exertion',
  'I felt scared without any good reason',
  'I felt that life was meaningless',
].map((text, i) => ({
  id: 7 + i,
  text,
  type: 'radio',
  options: dassOptions,
}));

const allQuestions = [...demographicQuestions, ...dassQuestions];

export const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); // ✅ For initial check

  const { user, logIn } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ Check if user already completed test before starting
  useEffect(() => {
    const checkAssessmentStatus = async () => {
      try {
        if (!user) {
          toast.error('Account not authenticated! Please log in again.', { toastId: 'auth-error' });
          logIn();
          return;
        }

        const res = await axios.get('http://localhost:5000/api/test/status', { withCredentials: true });

        if (res.data.completed) {
          setHasCompletedAssessment(true);
          toast.info('You have already completed the assessment. Please complete your 10-day plan before retaking the test.', { toastId: 'already-completed' });
          navigate('/dashboard'); // 👈 Redirect wherever you want
        }
      } catch (err) {
        console.error(err);
        toast.error('Error checking assessment status.', { toastId: 'check-error' });
      } finally {
        setCheckingStatus(false);
      }
    };

    checkAssessmentStatus();
  }, [user, logIn, navigate]);

  const currentQ = allQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== '';

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const submitAnswers = async () => {
    setLoading(true);
    try {
      const answerArray = allQuestions.map((q) => Number(answers[q.id] ?? 0));

      const response = await axios.post(
        'http://localhost:5000/api/test/assessment',
        { answers: answerArray },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message, { toastId: 'assessment-success' });
        setResult(response.data);
        setShowResults(true);
      } else {
        toast.error(response.data.message, { toastId: 'assessment-exists' });
      }
    } catch (error) {
      toast.error('Failed to submit answers. Please try again.', { toastId: 'submit-error' });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loading until check completes
  if (checkingStatus) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Checking assessment status...
      </div>
    );
  }

  if (showResults)
    return (
      <ResultView
        result={result}
        onRetake={() => {
          setShowResults(false);
          setAnswers({});
          setCurrentQuestion(0);
          setResult(null);
        }}
      />
    );

  if (hasCompletedAssessment) {
    return (
      <div className="flex justify-center items-center h-screen text-center px-6">
        <p className="text-xl font-medium text-gray-700">
          You have already completed the assessment. Please complete your 10-day plan before retaking the test.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-hero">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressHeader progress={progress} step={currentQuestion + 1} total={allQuestions.length} />
        <QuestionCard
          question={currentQ}
          answer={answers[currentQ.id]}
          onAnswerChange={handleAnswerChange}
          onNext={nextQuestion}
          onPrev={previousQuestion}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === allQuestions.length - 1}
          isAnswered={isAnswered}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Assessment;
