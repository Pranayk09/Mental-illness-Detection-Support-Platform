import React from 'react';
import { Brain, BarChart3, BookOpen, Shield } from 'lucide-react';

const features = [
  { icon: Brain, title: "Smart Assessment", description: "10-question assessment to understand your mental health status across depression, anxiety, and stress indicators." },
  { icon: BarChart3, title: "Progress Tracking", description: "Visual charts and insights to track your wellness journey and celebrate improvements over time." },
  { icon: BookOpen, title: "Curated Resources", description: "Access to meditation guides, articles, and expert-recommended tools for better mental health." },
  { icon: Shield, title: "Privacy First", description: "Your mental health data is encrypted and private. We never share your personal information." }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Features Designed for Your Wellbeing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform combines evidence-based assessment tools with personalized insights to help you understand and improve your mental health.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-lg border bg-white shadow-md hover:shadow-lg transition p-6 flex flex-col items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-2">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
