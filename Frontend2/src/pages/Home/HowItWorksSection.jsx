import React from "react";

const steps = [
  {
    number: "01",
    title: "Take Assessment",
    description: "Complete our quick 10-question mental health check-up",
  },
  {
    number: "02",
    title: "View Results",
    description: "Get personalized insights about your current wellness status",
  },
  {
    number: "03",
    title: "Track Progress",
    description: "Monitor your journey with beautiful charts and recommendations",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            How Nirvanic Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your journey to better mental wellness in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400/20 via-purple-500/40 to-blue-400/20 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white z-10 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 text-center group"
            >
              {/* Step Number */}
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-400/10 via-purple-500/10 to-transparent blur-3xl opacity-60"></div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
