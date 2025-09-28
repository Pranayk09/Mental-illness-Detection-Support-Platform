import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with mental wellness tracking",
      features: [
        "Monthly mental health assessments",
        "Basic progress tracking",
        "Access to 10 curated resources",
        "Community support forum",
        "Mobile app access"
      ],
      notIncluded: [
        "Weekly assessments",
        "Advanced analytics",
        "Personal wellness coach",
        "Premium resources library",
        "Priority support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "$12",
      period: "per month",
      description: "Enhanced features for serious mental wellness commitment",
      features: [
        "Everything in Free plan",
        "Weekly mental health assessments",
        "Advanced progress analytics",
        "Access to 100+ premium resources",
        "Personalized wellness recommendations",
        "Mood pattern analysis",
        "Export your data",
        "Priority email support"
      ],
      notIncluded: [
        "1-on-1 coaching sessions",
        "Custom wellness plans",
        "Phone support"
      ],
      buttonText: "Start Premium Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Complete mental wellness solution with personal coaching",
      features: [
        "Everything in Premium plan",
        "2 monthly 1-on-1 coaching sessions",
        "Custom wellness plan creation",
        "Advanced crisis intervention alerts",
        "Integration with health records",
        "Family/partner dashboard sharing",
        "Phone & video support",
        "Dedicated wellness coordinator"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Is my mental health data secure?",
      answer: "Yes, we use industry-standard encryption and never share your personal mental health information. Your data is stored securely and you maintain full control."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time through your account settings. No questions asked, no cancellation fees."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! We offer 50% off Premium plans for verified students. Contact our support team with your student ID for discount approval."
    },
    {
      question: "What if I need immediate crisis support?",
      answer: "MindCare provides resources and connections to crisis support, but we're not a replacement for emergency services. Always call 911 or 988 for immediate crisis intervention."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your 
            <span className="text-primary-deep"> Wellness Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start free and upgrade when you're ready for advanced features. 
            No hidden fees, cancel anytime.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>10K+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative card-gradient shadow-gentle ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                } hover:shadow-calm transition-shadow duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    variant={plan.buttonVariant} 
                    className="w-full mb-6" 
                    size="lg"
                    asChild={plan.name !== "Pro"}
                  >
                    {plan.name === "Pro" ? (
                      <span>{plan.buttonText}</span>
                    ) : (
                      <Link to={plan.name === "Free" ? "/assessment" : "/pricing"}>
                        {plan.buttonText}
                      </Link>
                    )}
                  </Button>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="border-t border-border my-4 pt-4">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Not Included
                          </p>
                        </div>
                        {plan.notIncluded.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3 opacity-60">
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                              <div className="h-1 w-3 bg-muted-foreground rounded" />
                            </div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose MindCare Premium?
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced features designed to accelerate your mental wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-gradient shadow-gentle">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Advanced Analytics
                </h3>
                <p className="text-muted-foreground">
                  Deep insights into your mental health patterns, triggers, and progress over time 
                  with AI-powered recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient shadow-gentle">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Expert Support
                </h3>
                <p className="text-muted-foreground">
                  Access to licensed mental health professionals and personalized 
                  guidance tailored to your specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about MindCare pricing and features
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-gradient shadow-gentle">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Prioritize Your Mental Health?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their mental wellness journey with MindCare. 
            Start free, no credit card required.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/assessment">
              Start Your Free Assessment
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;