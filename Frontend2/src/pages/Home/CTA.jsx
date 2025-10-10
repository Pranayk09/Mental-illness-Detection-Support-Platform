import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 text-gray-800">
      {/* Soft glowing pastel accents */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200/30 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
          Ready to Begin Your Wellness Journey?
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Take your first step toward better mental health. Our free assessment takes just a few minutes
          and gives you valuable insights about your emotional wellbeing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* 🌿 Primary CTA */}
          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium rounded-lg 
                       bg-gradient-to-r from-blue-400 to-purple-500 text-white 
                       shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            Start Free Assessment <ArrowRight className="ml-1 h-5 w-5" />
          </Link>

          {/* ✨ Secondary CTA */}
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium rounded-lg 
                       border border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
