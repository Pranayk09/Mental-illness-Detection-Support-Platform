import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Answer = 'never' | 'sometimes' | 'often' | 'always';

interface Question {
  id: number;
  text: string;
  category: 'depression' | 'anxiety' | 'stress';
}

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    { id: 1, text: "I often feel sad or hopeless", category: "depression" },
    { id: 2, text: "I have trouble sleeping or oversleeping", category: "depression" },
    { id: 3, text: "I feel anxious or worried about many things", category: "anxiety" },
    { id: 4, text: "I have little interest or pleasure in doing things", category: "depression" },
    { id: 5, text: "I feel restless or on edge", category: "anxiety" },
    { id: 6, text: "I get tired easily, even with small tasks", category: "stress" },
    { id: 7, text: "I avoid social interactions because of stress or anxiety", category: "anxiety" },
    { id: 8, text: "I feel nervous or have difficulty relaxing", category: "stress" },
    { id: 9, text: "I experience sudden mood swings or irritability", category: "stress" },
    { id: 10, text: "I struggle to concentrate on tasks or studies", category: "depression" }
  ];

  const handleAnswerChange = (answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const calculateScores = () => {
    const scoreMap = { never: 0, sometimes: 1, often: 2, always: 3 };
    const categories = { depression: 0, anxiety: 0, stress: 0 };
    const counts = { depression: 0, anxiety: 0, stress: 0 };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        categories[question.category] += scoreMap[answer];
        counts[question.category]++;
      }
    });

    return {
      depression: Math.round((categories.depression / (counts.depression * 3)) * 100),
      anxiety: Math.round((categories.anxiety / (counts.anxiety * 3)) * 100),
      stress: Math.round((categories.stress / (counts.stress * 3)) * 100)
    };
  };

  const getRecommendation = (scores: ReturnType<typeof calculateScores>) => {
    const maxScore = Math.max(scores.depression, scores.anxiety, scores.stress);
    
    if (maxScore < 30) {
      return {
        level: "Good",
        message: "You're doing well! Keep maintaining your current wellness practices.",
        color: "text-success"
      };
    } else if (maxScore < 60) {
      return {
        level: "Moderate",
        message: "Consider exploring some wellness resources and self-care practices.",
        color: "text-warning"
      };
    } else {
      return {
        level: "High",
        message: "We recommend speaking with a mental health professional for personalized support.",
        color: "text-destructive"
      };
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[questions[currentQuestion]?.id];

  if (showResults) {
    const scores = calculateScores();
    const recommendation = getRecommendation(scores);

    return (
      <div className="min-h-screen bg-gradient-hero py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Assessment Complete
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Your Mental Health Assessment Results
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's your personalized wellness overview
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="card-gradient shadow-gentle">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Depression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-deep mb-2">
                    {scores.depression}%
                  </div>
                  <Progress value={scores.depression} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-gentle">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Anxiety</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-secondary-deep mb-2">
                    {scores.anxiety}%
                  </div>
                  <Progress value={scores.anxiety} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient shadow-gentle">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-accent-foreground mb-2">
                    {scores.stress}%
                  </div>
                  <Progress value={scores.stress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-gradient shadow-gentle mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Assessment Summary
              </h3>
              <div className={`text-2xl font-bold mb-4 ${recommendation.color}`}>
                {recommendation.level} Wellness Level
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {recommendation.message}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Full Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/resources">
                    Explore Resources
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/assessment">
                Take Assessment Again
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Mental Health Assessment
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Quick Mental Health Check
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Answer 10 quick questions to check your mental health status across Depression, Anxiety, and Stress indicators.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        <Card className="card-gradient shadow-gentle">
          <CardHeader>
            <CardTitle className="text-center">
              Question {currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-xl font-medium text-foreground mb-8 text-center leading-relaxed">
              {questions[currentQuestion].text}
            </h3>

            <RadioGroup
              value={answers[questions[currentQuestion].id] || ''}
              onValueChange={(value) => handleAnswerChange(value as Answer)}
              className="space-y-4"
            >
              {[
                { value: 'never', label: 'Never' },
                { value: 'sometimes', label: 'Sometimes' },
                { value: 'often', label: 'Often' },
                { value: 'always', label: 'Always' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-lg"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                onClick={nextQuestion}
                disabled={!isAnswered}
              >
                {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
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