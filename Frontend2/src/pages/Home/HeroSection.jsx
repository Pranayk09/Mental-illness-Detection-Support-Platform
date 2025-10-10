import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heromeditation from '../../assets/hero-meditation.jpg';

const HeroSection = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Soft floating color accents */}
      <div className="absolute -top-20 -left-32 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-5 leading-snug">
              Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Better Mental Health</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Take control of your mental wellness with personalized assessments, mindful progress tracking, 
              and expert-curated resources designed to gently guide your path toward balance and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* 🌿 Primary Button */}
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium rounded-lg 
                           bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md hover:shadow-lg 
                           hover:scale-[1.03] transition-all duration-300"
              >
                Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              {/* ✨ Secondary Button */}
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium rounded-lg 
                           border border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 to-purple-300/20 rounded-xl blur-2xl"></div>
              <img 
                src={heromeditation} 
                alt="Peaceful meditation scene representing mental wellness"
                className="relative w-full rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
