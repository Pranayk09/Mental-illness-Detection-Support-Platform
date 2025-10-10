import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import dashboardPreview from '../../assets/dashBoardPreview.png';

const DashboardPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Image */}
          <div className="order-2 lg:order-1">
            <img 
              src={dashboardPreview} 
              alt="Mental health dashboard showing progress charts and wellness tracking"
              className="w-full rounded-xl shadow-md"
            />
          </div>

          {/* Dashboard Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Track Your Progress with <span className="text-primary-deep">Beautiful Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Visualize your mental health journey with intuitive charts, personalized recommendations, and progress tracking that celebrates every step forward.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {[
                "Real-time progress tracking",
                "Personalized wellness insights",
                "Goal setting and achievement tracking"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-foreground">{text}</span>
                </div>
              ))}
            </div>

            {/* 🎨 Redesigned Button */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-2 text-lg font-medium rounded-lg 
                         bg-gradient-to-r from-blue-400 to-purple-500 text-white 
                         shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 
                         hover:scale-105 hover:brightness-110 
                         transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              View Your Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
