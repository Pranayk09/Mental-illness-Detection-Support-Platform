import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    role: "Graduate Student",
    rating: 5,
    content:
      "MindCare helped me understand my anxiety patterns and gave me tools to manage them better. The gentle approach made me feel safe to explore my mental health.",
  },
  {
    name: "David L.",
    role: "Software Engineer",
    rating: 5,
    content:
      "The progress tracking feature is incredible. Seeing my improvement over time motivated me to continue my wellness practices. Highly recommend!",
  },
  {
    name: "Priya K.",
    role: "Teacher",
    rating: 5,
    content:
      "The assessments and personalized insights are eye-opening. It feels like having a supportive friend guiding me toward mindfulness.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-14  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people improving their mental well-being with Nirvanic.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 
                         hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-800 mb-6 italic leading-relaxed">
                “{testimonial.content}”
              </p>

              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient blobs (very subtle) */}
      <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default TestimonialsSection;
