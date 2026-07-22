import React from "react";
import PricingCard from "./PricingCard";
import FeatureCard from "./FeatureCard";
import FAQItem from "./FAQItem";
import { Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../Home/CTA";

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
        "Mobile app access",
      ],
      notIncluded: [
        "Weekly assessments",
        "Advanced analytics",
        "Personal wellness coach",
      ],
      buttonText: "Get Started Free",
      popular: false,
    },
    {
      name: "Premium",
      price: "$12",
      period: "per month",
      description: "Enhanced features for serious mental wellness commitment",
      features: [
        "Everything in Free plan",
        "Weekly assessments",
        "Advanced analytics",
        "Access to 100+ premium resources",
        "Personalized recommendations",
      ],
      notIncluded: ["1-on-1 coaching", "Phone support"],
      buttonText: "Start Premium Trial",
      popular: true,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Complete solution with personal coaching and advanced support",
      features: [
        "Everything in Premium plan",
        "2 monthly 1-on-1 sessions",
        "Custom wellness plan creation",
        "Integration with health records",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      popular: false,
    },
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl font-bold mb-3">
          Choose Your <span className="text-purple-600">Wellness Journey</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start free and upgrade when you're ready for more advanced features.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose Premium?</h2>
          <p className="text-gray-600">
            Powerful tools designed to boost your mental wellness journey.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <FeatureCard
            icon={Zap}
            title="Advanced Analytics"
            description="AI-powered insights into your mood patterns and wellness growth."
          />
          <FeatureCard
            icon={Users}
            title="Expert Support"
            description="Talk to licensed professionals and receive personalized care plans."
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Everything you need to know about MindCare pricing and features.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6 px-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </section>

     <CTASection></CTASection>
    </div>
  );
};

export default Pricing;
