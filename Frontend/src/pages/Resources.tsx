import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Headphones,
  ExternalLink,
  Clock,
  Star
} from 'lucide-react';
import resourcesImage from '@/assets/resources-illustration.jpg';

const Resources = () => {
  const categories = [
    {
      title: "Meditation & Mindfulness",
      icon: Headphones,
      color: "bg-primary",
      resources: [
        {
          title: "10-Minute Morning Meditation",
          type: "Audio",
          duration: "10 min",
          rating: 4.8,
          description: "Start your day with clarity and calm through this guided meditation practice."
        },
        {
          title: "Body Scan for Anxiety Relief",
          type: "Audio",
          duration: "15 min",
          rating: 4.9,
          description: "Progressive body relaxation technique to reduce anxiety and physical tension."
        },
        {
          title: "Mindful Breathing Techniques",
          type: "Guide",
          duration: "5 min read",
          rating: 4.7,
          description: "Learn simple breathing exercises you can use anywhere to manage stress."
        }
      ]
    },
    {
      title: "Educational Articles",
      icon: BookOpen,
      color: "bg-secondary",
      resources: [
        {
          title: "Understanding Depression: A Comprehensive Guide",
          type: "Article",
          duration: "12 min read",
          rating: 4.6,
          description: "Learn about depression symptoms, causes, and evidence-based treatment options."
        },
        {
          title: "Managing Anxiety in Daily Life",
          type: "Article",
          duration: "8 min read",
          rating: 4.8,
          description: "Practical strategies for coping with anxiety in work, relationships, and social situations."
        },
        {
          title: "The Science of Stress and Recovery",
          type: "Article",
          duration: "10 min read",
          rating: 4.5,
          description: "Understand how stress affects your body and mind, plus recovery techniques."
        }
      ]
    },
    {
      title: "Guided Exercises",
      icon: PlayCircle,
      color: "bg-accent",
      resources: [
        {
          title: "Progressive Muscle Relaxation",
          type: "Exercise",
          duration: "20 min",
          rating: 4.7,
          description: "Step-by-step muscle tension and release technique for deep relaxation."
        },
        {
          title: "Cognitive Behavioral Therapy Worksheets",
          type: "Worksheet",
          duration: "Variable",
          rating: 4.9,
          description: "Interactive exercises to identify and challenge negative thought patterns."
        },
        {
          title: "Gratitude Practice Journal",
          type: "Exercise",
          duration: "5 min daily",
          rating: 4.8,
          description: "Daily prompts to cultivate gratitude and positive thinking habits."
        }
      ]
    },
    {
      title: "Crisis Support",
      icon: FileText,
      color: "bg-destructive",
      resources: [
        {
          title: "Emergency Mental Health Hotlines",
          type: "Directory",
          duration: "Instant",
          rating: 5.0,
          description: "24/7 crisis support numbers and text lines for immediate help."
        },
        {
          title: "When to Seek Professional Help",
          type: "Guide",
          duration: "6 min read",
          rating: 4.8,
          description: "Signs that indicate it's time to consult with a mental health professional."
        },
        {
          title: "Local Therapy Provider Directory",
          type: "Directory",
          duration: "Variable",
          rating: 4.6,
          description: "Find qualified therapists and counselors in your area."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Mental Health Resources
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Curated Wellness Resources 
                <span className="text-primary-deep"> for Your Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Access expert-approved articles, guided meditations, exercises, and support resources 
                to enhance your mental health and wellbeing.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span>Expert Reviewed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Updated Weekly</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src={resourcesImage} 
                alt="Peaceful wellness resources with books and meditation elements"
                className="w-full rounded-xl shadow-gentle"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <Card key={resourceIndex} className="card-gradient shadow-gentle hover:shadow-calm transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2 text-xs">
                              {resource.type}
                            </Badge>
                            <CardTitle className="text-lg leading-tight">
                              {resource.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {resource.duration}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium text-foreground">
                              {resource.rating}
                            </span>
                          </div>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          Access Resource
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-xl p-8 shadow-gentle">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Need Immediate Support?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're experiencing a mental health emergency or having thoughts of self-harm, 
              please reach out for help immediately. You're not alone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Card className="p-4 bg-destructive text-destructive-foreground">
                <h3 className="font-semibold mb-2">Crisis Text Line</h3>
                <p className="text-sm mb-2">Text HOME to 741741</p>
                <p className="text-xs opacity-90">24/7 Crisis Support</p>
              </Card>
              <Card className="p-4 bg-destructive text-destructive-foreground">
                <h3 className="font-semibold mb-2">National Suicide Prevention</h3>
                <p className="text-sm mb-2">Call 988</p>
                <p className="text-xs opacity-90">24/7 Lifeline Support</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;