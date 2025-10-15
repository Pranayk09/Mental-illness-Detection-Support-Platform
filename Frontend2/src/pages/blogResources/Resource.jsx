import React from "react";
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Headphones,
  ExternalLink,
  Clock,
  Star,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import resourcesImage from "../../assets/Gemini_Generated_Image_2wsgq72wsgq72wsg.png";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-xl border border-blue-100 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all overflow-hidden",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-gray-900 leading-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const Button = React.forwardRef(({ className = "", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-[1.03] shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

const Badge = ({ children, className }) => (
  <span className={cn("inline-flex items-center rounded-md bg-blue-50 text-blue-700 px-2 py-1 text-xs font-semibold", className)}>
    {children}
  </span>
);

const Resources = ({ userHasPlan = false }) => {
  const navigate = useNavigate();

  // These categories are premium-only
  const lockedCategories = ["Guided Exercises", "Crisis Support"];

  const categories = [
    {
      title: "Meditation & Mindfulness",
      icon: Headphones,
      color: "from-blue-400 to-purple-400",
      resources: [
        {
          title: "10-Minute Morning Meditation",
          type: "Audio",
          duration: "10 min",
          rating: 4.8,
          description: "Start your day with clarity and calm through this guided meditation practice.",
          link: "https://www.youtube.com/watch?v=FGO8IWiusJo"
        },
        {
          title: "Body Scan for Anxiety Relief",
          type: "Audio",
          duration: "15 min",
          rating: 4.9,
          description: "Progressive body relaxation technique to reduce anxiety and physical tension.",
          link: "https://www.youtube.com/watch?v=6iDKF-TrAfE"
        },
        {
          title: "Mindful Breathing Techniques",
          type: "Guide",
          duration: "5 min read",
          rating: 4.7,
          description: "Learn simple breathing exercises you can use anywhere to manage stress.",
          link: "https://www.youtube.com/watch?v=DLkoZtiXeqQ"
        }
      ]
    },
    {
      title: "Educational Articles",
      icon: BookOpen,
      color: "from-purple-400 to-pink-400",
      resources: [
        {
          title: "Understanding Depression: A Comprehensive Guide",
          type: "Article",
          duration: "12 min read",
          rating: 4.6,
          description: "Learn about depression symptoms, causes, and evidence-based treatment options.",
          link: "https://medium.com/mind-cafe/a-complete-guide-to-depression-e426430094b1"
        },
        {
          title: "Managing Anxiety in Daily Life",
          type: "Article",
          duration: "8 min read",
          rating: 4.8,
          description: "Practical strategies for coping with anxiety in work, relationships, and social situations.",
          link: "https://www.mdanderson.org/cancerwise/anxiety-hacks--7-tools-to-manage-stress-and-worry-in-the-moment.h00-159537378.html"
        },
        {
          title: "The Science of Stress and Recovery",
          type: "Article",
          duration: "10 min read",
          rating: 4.5,
          description: "Understand how stress affects your body and mind, plus recovery techniques.",
          link: "https://www.health.harvard.edu/staying-healthy/understanding-the-stress-response"
        }
      ]
    },
    {
      title: "Guided Exercises",
      icon: PlayCircle,
      color: "from-blue-500 to-teal-400",
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
      color: "from-red-400 to-orange-400",
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-5 leading-snug">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Wellness Resources</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Access guided meditations, self-help articles, and mental wellness exercises tailored to your needs.
            </p>
          </div>
          <div className="w-full h-120 overflow-hidden rounded-xl shadow-lg">
            <img src={resourcesImage} alt="Peaceful wellness resources illustration" className="w-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          {categories.map((category, i) => {
            const isLocked = lockedCategories.includes(category.title) && !userHasPlan;

            return (
              <div key={i} className="relative">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    {category.title}
                    {isLocked && <Lock className="h-5 w-5 text-gray-500" />}
                  </h2>
                </div>

                {/* Cards Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isLocked ? "opacity-40 blur-[2px]" : ""}`}>
                  {category.resources.map((res, j) => (
                    <Card key={j}>
                      <CardHeader>
                        <Badge className="mb-2">{res.type}</Badge>
                        <CardTitle>{res.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{res.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{res.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-700">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{res.rating}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          onClick={() => {
                            if (isLocked) navigate("/pricing");
                            else window.open(res.link, "_blank");
                          }}
                        >
                          {isLocked ? "Upgrade to Access" : "Access Resource"}
                          {isLocked ? <Lock className="ml-2 h-4 w-4" /> : <ExternalLink className="ml-2 h-4 w-4" />}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Overlay text for locked section */}
                {isLocked && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-700 font-medium cursor-pointer"
                    onClick={() => navigate("/pricing")}
                  >
                    <Lock className="h-8 w-8 text-gray-600 mb-2" />
                    <p className="text-sm">Premium section – unlock by visiting the Pricing page.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Resources;
