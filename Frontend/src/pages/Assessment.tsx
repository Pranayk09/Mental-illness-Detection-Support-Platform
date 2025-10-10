import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Answer = string | number;

interface Question {
  id: number;
  text: string;
  type?: 'radio' | 'select' | 'number';
  options?: { label: string; value: number }[];
}

const demographicQuestions: Question[] = [
  { id: 1, text: 'Age', type: 'number' },
  { id: 2, text: 'Gender', type: 'radio', options: [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }] },
  { id: 3, text: 'Marital Status', type: 'radio', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }] },
  { id: 4, text: 'Educational Status', type: 'select', options: [
    { label: 'Illiterate', value: 1 },
    { label: 'Primary', value: 2 },
    { label: 'SSC', value: 3 },
    { label: 'HSC', value: 4 },
    { label: 'Graduation and above', value: 5 }
  ]},
  { id: 5, text: 'Occupational Status', type: 'select', options: [
    { label: 'Housewife', value: 1 },
    { label: 'Service', value: 2 },
    { label: 'Business', value: 3 },
    { label: 'Student', value: 4 },
    { label: 'Day labor', value: 5 },
    { label: 'Unemployed', value: 6 }
  ]},
  { id: 6, text: 'Sleeping problem', type: 'radio', options: [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 }
  ]},
];

const dassQuestions: Question[] = [
  { id: 7, text: 'I found it hard to wind down', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 8, text: 'I was aware of dryness of my mouth', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 9, text: 'I couldn’t seem to experience any positive feeling at all', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 10, text: 'I experienced breathing difficulty', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 11, text: 'I found it difficult to work up the initiative to do things', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 12, text: 'I tended to over-react to situations', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 13, text: 'I experienced trembling (eg, in the hands)', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 14, text: 'I felt that I was using a lot of nervous energy', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 15, text: 'I was worried about situations in which I might panic', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 16, text: 'I felt that I had nothing to look forward to', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 17, text: 'I found myself getting agitated', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 18, text: 'I found it difficult to relax', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 19, text: 'I felt down-hearted and blue', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 20, text: 'I was intolerant of anything that kept me from getting on with what I was doing', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 21, text: 'I felt I was close to panic', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 22, text: 'I was unable to become enthusiastic about anything', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 23, text: 'I felt I wasn’t worth much as a person', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 24, text: 'I felt that I was rather touchy', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 25, text: 'I was aware of the action of my heart in the absence of physical exertion', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 26, text: 'I felt scared without any good reason', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
  { id: 27, text: 'I felt that life was meaningless', type: 'radio', options: [{label:'Never', value:0},{label:'Sometimes', value:1},{label:'Often', value:2},{label:'Almost Always', value:3}] },
];

const allQuestions = [...demographicQuestions, ...dassQuestions];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (value: Answer) => {
    setAnswers(prev => ({ ...prev, [allQuestions[currentQuestion].id]: value }));
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

  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
  const isAnswered = answers[allQuestions[currentQuestion]?.id] !== undefined && answers[allQuestions[currentQuestion]?.id] !== '';

  const submitAnswers = async () => {
    setLoading(true);
    try {
      const answerArray = allQuestions.map(q => Number(answers[q.id] ?? 0));
      console.log(answerArray)
    const response = await axios.post(
  'http://localhost:5000/api/test/assessment',
  { answers: answerArray },
  { withCredentials: true } // ✅ important for cookies
);

      setResult(response.data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit answers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero py-12">
        <Badge variant="secondary" className="mb-4">Assessment Complete</Badge>
        <h1 className="text-3xl font-bold mb-4">Your Assessment Result</h1>
        <pre className="bg-muted p-6 rounded-lg">{JSON.stringify(result, null, 2)}</pre>
        <Button asChild className="mt-6">
          <Link to="/assessment">Take Assessment Again</Link>
        </Button>
      </div>
    );
  }

  const currentQ = allQuestions[currentQuestion];

  return (
    <div className="min-h-screen py-12 bg-gradient-hero">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">Mental Health Assessment</Badge>
          <h1 className="text-3xl font-bold mb-2">Assessment</h1>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <div className="text-sm text-muted-foreground mt-1">
              {currentQuestion + 1} of {allQuestions.length}
            </div>
          </div>
        </div>

        <Card className="card-gradient shadow-gentle">
          <CardHeader>
            <CardTitle className="text-center">Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-lg text-center mb-6">{currentQ.text}</h3>

            {/* Render input/select/radio based on question type */}
            {currentQ.type === 'number' && (
              <input
                type="number"
                min={0}
                value={answers[currentQ.id] ?? ''}
                onChange={(e) => handleAnswerChange(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-border"
              />
            )}

            {currentQ.type === 'select' && (
              <select
                value={answers[currentQ.id] ?? ''}
                onChange={(e) => handleAnswerChange(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-border"
              >
                <option value="">Select an option</option>
                {currentQ.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}

            {currentQ.type === 'radio' && (
              <RadioGroup
                value={answers[currentQ.id]?.toString() ?? ''}
                onValueChange={(v) => handleAnswerChange(Number(v))}
                className="space-y-4"
              >
                {currentQ.options?.map(opt => (
                  <div key={opt.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={opt.value.toString()} id={opt.value.toString()} />
                    <Label htmlFor={opt.value.toString()} className="flex-1 cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={previousQuestion} disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={nextQuestion} disabled={!isAnswered}>
                {currentQuestion === allQuestions.length - 1 ? (loading ? 'Submitting...' : 'Finish') : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;