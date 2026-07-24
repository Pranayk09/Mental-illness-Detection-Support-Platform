import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {
  BookOpen,
  PlayCircle,
  FileText,
  Headphones,
  ExternalLink,
  Clock,
  Star,
  Lock,
  Search,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  X,
  Youtube,
  Zap,
  ArrowRight,
  Filter,
  RefreshCw,
  Loader2
} from "lucide-react";

// Convert regular YouTube URLs (watch?v=ID) to embed URLs (embed/ID)
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
};

export const Resource = () => {
  const navigate = useNavigate();
  const { backendUrl, token, user, subscription, setShowLogin, loadingUser } = useContext(AppContext);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = [
    "All",
    "Crisis Support",
    "Featured Articles",
    "Videos",
    "Guided Exercises",
    "CBT Worksheets",
    "Meditation & Breathing",
    "Sleep Improvement",
  ];

  const storedToken = localStorage.getItem("token") || token;
  const isAuthenticated = !!(user || storedToken);
  const isPremiumActive = subscription?.isPremium && isAuthenticated;

  // Fetch Resources from Backend API
  const fetchResources = async () => {
    setLoading(true);
    try {
      const activeToken = localStorage.getItem("token") || token;
      const params = {};
      if (activeCategory !== "All") params.category = activeCategory;
      if (activeType !== "All") params.type = activeType;
      if (searchQuery.trim()) params.search = searchQuery;

      const headers = activeToken ? { token: activeToken } : {};

      const res = await axios.get(`${backendUrl}/api/resources`, {
        params,
        withCredentials: true,
        headers,
      });

      if (res.data && res.data.success) {
        setResources(res.data.resources || []);
      }
    } catch (err) {
      console.error("Resources fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [backendUrl, token, user, activeCategory, activeType, searchQuery]);

  // Handle Resource Click according to user authorization status
  const handleOpenResource = (res) => {
    // Crisis Support is ALWAYS unlocked for everyone
    if (res.category === "Crisis Support" || !res.isPremium) {
      setSelectedResource(res);
      return;
    }

    // Locked Premium Resource behavior based on Auth State:
    if (res.locked || !isPremiumActive) {
      if (!isAuthenticated) {
        // Guest user -> Redirect to Login
        setShowLogin(true);
      } else {
        // Logged-in Free user or Expired -> Redirect to Pricing
        navigate("/pricing");
      }
      return;
    }

    setSelectedResource(res);
  };

  // Directly open external URL or YouTube link in a new tab
  const handleDirectExternalOpen = (e, url, isLocked) => {
    e.stopPropagation();
    if (isLocked && !isPremiumActive) {
      if (!isAuthenticated) {
        setShowLogin(true);
      } else {
        navigate("/pricing");
      }
      return;
    }
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-teal-50/30 via-sky-50/30 to-indigo-50/60 text-slate-800 font-sans pb-16">
      
      {/* 🌟 HERO HEADER */}
      <section className="relative py-12 lg:py-16 bg-white/60 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">Mental Health Resources</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Explore evidence-based CBT guides, guided exercises, video learning libraries, and emergency helplines dynamically tailored to support your emotional well-being.
            </p>
          </div>

          {/* 💎 SUBSCRIPTION STATUS DYNAMIC BANNER */}
          <div className="mt-8">
            {isPremiumActive ? (
              // Active Premium Banner: No locks or upgrade prompts!
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white rounded-3xl p-6 shadow-xl shadow-emerald-600/20 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Nirvanic Premium Unlocked</h3>
                    <p className="text-xs text-emerald-100 font-medium">
                      You have full, unrestricted access to all clinical articles, video guides, CBT worksheets, and meditation exercises.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-xs font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white">
                  {subscription.daysRemaining > 0 ? `${subscription.daysRemaining} Days Active` : "Premium Active"}
                </div>
              </motion.div>
            ) : isAuthenticated ? (
              // Logged-in Free or Expired Banner -> Pricing Link
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-amber-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      {subscription.plan !== "Free" ? "Subscription Expired - Renew Access" : "Unlock Full Premium Resource Library"}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Upgrade to Premium to access video guides, CBT worksheets, box breathing exercises, and expert sleep hygiene routines.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/pricing")}
                  className="shrink-0 py-3 px-6 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  {subscription.plan !== "Free" ? "Renew Premium" : "Upgrade to Premium"} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              // Guest User Banner -> Sign In Prompt
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Browsing as Guest</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Free resources and emergency crisis support are available to everyone. Sign in to unlock full premium resources and personalized plans.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowLogin(true)}
                  className="shrink-0 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  Sign In to Access <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 🚨 CRISIS SUPPORT SECTION (ALWAYS UNLOCKED FOR ALL USERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-gradient-to-br from-red-500 via-rose-600 to-pink-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-600/20 relative overflow-hidden border border-rose-400/40">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-amber-300">
                  <PhoneCall className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Emergency Crisis & Mental Health Helplines (India)
                  </h2>
                </div>
              </div>

              <span className="text-xs font-extrabold bg-white text-rose-800 px-3.5 py-1.5 rounded-full shadow-sm">
                24/7 Available
              </span>
            </div>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
              If you or someone you know is experiencing severe distress, panic, thoughts of self-harm, or an acute emotional crisis, immediate help is available. Reach out to these verified toll-free helplines:
            </p>

            {/* Helpline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between space-y-2">
                <span className="text-xs font-bold text-amber-300">Tele-MANAS Helpline</span>
                <span className="text-xl font-extrabold">14416</span>
                <span className="text-[11px] text-rose-100">1800-891-4416 (24/7 Govt of India)</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between space-y-2">
                <span className="text-xs font-bold text-amber-300">KIRAN Helpline</span>
                <span className="text-xl font-extrabold">1800-599-0019</span>
                <span className="text-[11px] text-rose-100">National Mental Health Rehab</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between space-y-2">
                <span className="text-xs font-bold text-amber-300">National Emergency</span>
                <span className="text-xl font-extrabold">Dial 112</span>
                <span className="text-[11px] text-rose-100">Immediate Medical Emergency</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col justify-between space-y-2">
                <span className="text-xs font-bold text-amber-300">Vandrevala Foundation</span>
                <span className="text-xl font-extrabold">+91 9999 666 555</span>
                <span className="text-[11px] text-rose-100">Free Professional Counseling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 SEARCH & CATEGORY FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search resources, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all shadow-xs"
            />
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {["All", "article", "video", "exercise", "worksheet", "crisis"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  activeType === type
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/60">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 📚 RESOURCE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="py-16 text-center text-slate-500 font-semibold text-sm">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            Loading resources from Nirvanic API...
          </div>
        ) : resources.length === 0 ? (
          <div className="py-16 text-center bg-white/60 rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-3">
            <Filter className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No resources found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or category filters.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveType("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {resources.map((res) => {
              const isCrisis = res.category === "Crisis Support";

              // A resource is locked if it's marked locked by API or if it's premium and user is not active premium
              const isLocked = !isCrisis && res.isPremium && (!isPremiumActive || res.locked);
              const targetUrl = res.youtubeUrl || res.externalUrl;

              return (
                <motion.div
                  key={res._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: isLocked ? 0 : -4 }}
                  onClick={() => handleOpenResource(res)}
                  className={`bg-white/80 backdrop-blur-xl border rounded-3xl shadow-xl shadow-teal-900/5 overflow-hidden flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                    isCrisis
                      ? "border-rose-200 bg-rose-50/30"
                      : isLocked
                      ? "border-slate-200/80"
                      : "border-white/60 hover:shadow-2xl"
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={res.thumbnailUrl || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80"}
                      alt={res.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isLocked ? "filter blur-[3px] opacity-70" : ""
                      }`}
                    />

                    {/* Category & Type Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        isCrisis
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-900/80 backdrop-blur-md text-white"
                      }`}>
                        {res.resourceType}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                        {res.category}
                      </span>
                    </div>

                    {/* Locked Overlay for Non-Premium / Guest Users */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center z-20">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 border border-white/30">
                          <Lock className="w-5 h-5 text-amber-300" />
                        </div>
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                          Premium Resource
                        </span>
                        <p className="text-[11px] text-slate-200 mt-1 max-w-[200px]">
                          {!isAuthenticated ? "Sign in to access premium" : "Upgrade membership to unlock full access"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {res.duration}
                        </span>
                        {res.rating && (
                          <span className="flex items-center gap-1 font-bold text-slate-700">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {res.rating}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                        {res.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                        {res.description}
                      </p>
                    </div>

                    {/* Footer Info & Action Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-400 truncate max-w-[110px]">
                        {res.author || "Nirvanic Health"}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {!isLocked && targetUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleDirectExternalOpen(e, targetUrl, isLocked)}
                            title="Open Link / YouTube directly in new tab"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenResource(res)}
                          className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isLocked
                              ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                              : isCrisis
                              ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                          }`}
                        >
                          {isLocked ? (
                            !isAuthenticated ? (
                              <>Sign In <Lock className="w-3.5 h-3.5" /></>
                            ) : (
                              <>Upgrade Access <Lock className="w-3.5 h-3.5" /></>
                            )
                          ) : res.resourceType === "video" ? (
                            <>Watch Video <Youtube className="w-3.5 h-3.5" /></>
                          ) : isCrisis ? (
                            <>View Contacts <PhoneCall className="w-3.5 h-3.5" /></>
                          ) : (
                            <>Read Content <BookOpen className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 📖 RESOURCE READER / YOUTUBE MODAL */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 relative my-8 text-left space-y-5"
            >
              <button
                onClick={() => setSelectedResource(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  {selectedResource.resourceType}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedResource.category} • {selectedResource.duration}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 pr-10">
                {selectedResource.title}
              </h2>

              {/* Embedded YouTube Video Player */}
              {(selectedResource.youtubeUrl || selectedResource.externalUrl?.includes("youtube")) && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(selectedResource.youtubeUrl || selectedResource.externalUrl)}
                    title={selectedResource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-medium max-h-96 overflow-y-auto pr-2">
                {selectedResource.content ? (
                  selectedResource.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{selectedResource.description}</p>
                )}
              </div>

              {/* Action Footer for External Site / YouTube Link */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-500">
                  Source: {selectedResource.source || selectedResource.author}
                </span>

                {(selectedResource.externalUrl || selectedResource.youtubeUrl) && (
                  <a
                    href={selectedResource.externalUrl || selectedResource.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                  >
                    Open Source / YouTube Link <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Resource;
