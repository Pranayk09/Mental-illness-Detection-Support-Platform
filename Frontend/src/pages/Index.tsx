import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  BarChart3, 
  BookOpen, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-meditation.jpg';
import dashboardPreview from '@/assets/dashboard-preview.jpg';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Assessment",
      description: "10-question assessment to understand your mental health status across depression, anxiety, and stress indicators."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Visual charts and insights to track your wellness journey and celebrate improvements over time."
    },
    {
      icon: BookOpen,
      title: "Curated Resources",
      description: "Access to meditation guides, articles, and expert-recommended tools for better mental health."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your mental health data is encrypted and private. We never share your personal information."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Take Assessment", 
      description: "Complete our quick 10-question mental health check-up"
    },
    {
      number: "02",
      title: "View Results",
      description: "Get personalized insights about your current wellness status"
    },
    {
      number: "03", 
      title: "Track Progress",
      description: "Monitor your journey with beautiful charts and recommendations"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Graduate Student",
      content: "MindCare helped me understand my anxiety patterns and gave me tools to manage them better. The gentle approach made me feel safe to explore my mental health.",
      rating: 5
    },
    {
      name: "David L.",
      role: "Software Engineer", 
      content: "The progress tracking feature is incredible. Seeing my improvement over time motivated me to continue my wellness practices. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <Badge variant="secondary" className="mb-4">
                Mental Health & Wellness Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Journey to 
                <span className="text-primary-deep"> Better Mental Health</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Take control of your mental wellness with personalized assessments, progress tracking, 
                and expert-curated resources designed to support your journey to better mental health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/assessment">
                    Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </div>
            <div className="slide-up">
              <img 
                src={heroImage} 
                alt="Peaceful meditation scene representing mental wellness"
                className="w-full rounded-xl shadow-calm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Features Designed for Your Wellbeing
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines evidence-based assessment tools with personalized insights 
              to help you understand and improve your mental health.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-gentle hover:shadow-calm transition-shadow duration-300 card-gradient">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How MindCare Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get started on your wellness journey in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center fade-in">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={dashboardPreview} 
                alt="Mental health dashboard showing progress charts and wellness tracking"
                className="w-full rounded-xl shadow-gentle"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">
                Personalized Dashboard
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Track Your Progress with 
                <span className="text-primary-deep"> Beautiful Insights</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Visualize your mental health journey with intuitive charts, personalized 
                recommendations, and progress tracking that celebrates every step forward.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Real-time progress tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Personalized wellness insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">Goal setting and achievement tracking</span>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  View Your Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our community of users who have found peace and progress in their mental health journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-gentle card-gradient">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health. Our free assessment takes just 3 minutes 
            and provides valuable insights about your current wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/assessment">
                Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;