import resourceModel from "../models/resourceModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Helper to check if requesting user has an active premium subscription
const checkIsUserPremium = async (req) => {
  try {
    const token = req.cookies?.token || req.headers?.token;
    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return false;

    if (user.plan !== "Free" && user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
      user.plan = "Free";
      await user.save();
      return false;
    }

    return user.plan !== "Free";
  } catch (e) {
    return false;
  }
};

// GET /api/resources
export const getAllResources = async (req, res) => {
  try {
    const isPremiumUser = await checkIsUserPremium(req);
    const { category, search, type } = req.query;

    let query = { isActive: true };
    if (category && category !== "All") {
      query.category = category;
    }
    if (type && type !== "All") {
      query.resourceType = type;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    const resources = await resourceModel.find(query).sort({ displayOrder: 1, createdAt: -1 });

    // Process access locking state dynamically
    const processedResources = resources.map((r) => {
      const obj = r.toObject();
      const isCrisis = obj.category === "Crisis Support";
      const isLocked = !isCrisis && obj.isPremium && !isPremiumUser;

      if (isLocked) {
        return {
          ...obj,
          locked: true,
          content: obj.description, // Hide full article content for non-premium
          youtubeUrl: "", // Hide video link for non-premium
          externalUrl: ""
        };
      }

      return {
        ...obj,
        locked: false
      };
    });

    return res.json({
      success: true,
      count: processedResources.length,
      isUserPremium: isPremiumUser,
      resources: processedResources
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// GET /api/resources/:id
export const getResourceById = async (req, res) => {
  try {
    const isPremiumUser = await checkIsUserPremium(req);
    const resource = await resourceModel.findById(req.params.id);

    if (!resource || !resource.isActive) {
      return res.status(404).json({ success: false, message: "Resource not found" });
    }

    const isCrisis = resource.category === "Crisis Support";
    const isLocked = !isCrisis && resource.isPremium && !isPremiumUser;

    if (isLocked) {
      return res.status(403).json({
        success: false,
        message: "Premium subscription required to access this resource",
        locked: true,
        resource: {
          _id: resource._id,
          title: resource.title,
          description: resource.description,
          category: resource.category,
          resourceType: resource.resourceType,
          thumbnailUrl: resource.thumbnailUrl,
          duration: resource.duration,
          isPremium: true,
          locked: true
        }
      });
    }

    return res.json({
      success: true,
      locked: false,
      resource
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Seed unique resources into MongoDB
export const seedResources = async (req, res) => {
  try {
    const sampleResources = [
      // 🚨 CRISIS SUPPORT (NEVER LOCKED!)
      {
        title: "Tele-MANAS National Mental Health Helpline",
        description: "24/7 Toll-Free Indian National Tele-Mental Health Assistance and Networking Across States.",
        content: "Tele-MANAS is an initiative by the Ministry of Health and Family Welfare, Government of India, offering 24/7 tele-mental health services in 20+ regional Indian languages. Call 14416 or 1800-891-4416 anytime for immediate support from licensed counselors.",
        category: "Crisis Support",
        resourceType: "crisis",
        thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://telemanas.mohfw.gov.in/",
        duration: "24/7 Toll Free",
        isPremium: false,
        rating: 5.0,
        author: "Ministry of Health & Family Welfare",
        source: "Govt of India",
        tags: ["Crisis", "India", "Helpline", "Tele-MANAS"],
        displayOrder: 1
      },
      {
        title: "KIRAN National Mental Health Helpline",
        description: "24/7 Toll-free mental health rehabilitation helpline (1800-599-0019).",
        content: "KIRAN helpline provides early screening, first-aid, psychological support, distress management, and mental health rehabilitation services across India.",
        category: "Crisis Support",
        resourceType: "crisis",
        thumbnailUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://kiran.gov.in/",
        duration: "24/7 Toll Free",
        isPremium: false,
        rating: 5.0,
        author: "Ministry of Social Justice",
        source: "Govt of India",
        tags: ["KIRAN", "India", "Helpline", "Rehabilitation"],
        displayOrder: 2
      },
      {
        title: "National Emergency Helpline - Dial 112",
        description: "For immediate life-threatening physical or mental health emergencies across India.",
        content: "Dial 112 for immediate all-in-one emergency response assistance across India for urgent medical or crisis intervention.",
        category: "Crisis Support",
        resourceType: "crisis",
        thumbnailUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://112.gov.in/",
        duration: "Instant",
        isPremium: false,
        rating: 5.0,
        author: "Emergency Services",
        source: "Govt of India",
        tags: ["Emergency", "112", "India"],
        displayOrder: 3
      },
      {
        title: "Vandrevala Foundation Mental Health Helpline",
        description: "24/7 Free, confidential professional mental health counseling (+91 9999 666 555).",
        content: "Vandrevala Foundation offers round-the-clock free psychological counseling and crisis intervention by trained clinical psychologists.",
        category: "Crisis Support",
        resourceType: "crisis",
        thumbnailUrl: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.vandrevalafoundation.com/",
        duration: "24/7 Helpline",
        isPremium: false,
        rating: 4.9,
        author: "Vandrevala Foundation",
        source: "Mental Health NGO",
        tags: ["Counseling", "Vandrevala", "Helpline"],
        displayOrder: 4
      },

      // 📰 FEATURED ARTICLES (WHO, NIMH, Mind UK)
      {
        title: "Understanding Depression: Symptoms & Evidence-Based Recovery",
        description: "A comprehensive guide by WHO on understanding depression symptoms, causes, and scientific recovery pathways.",
        content: "Depression is more than just feeling sad. It is a common mental health condition characterized by persistent sadness and loss of interest in activities once enjoyed. Scientifically validated treatments include Cognitive Behavioral Therapy (CBT), interpersonal therapy, mindfulness practices, and lifestyle adjustments such as regular exercise and balanced sleep hygiene.",
        category: "Featured Articles",
        resourceType: "article",
        thumbnailUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.who.int/news-room/fact-sheets/detail/depression",
        duration: "10 min read",
        isPremium: false,
        rating: 4.9,
        author: "World Health Organization (WHO)",
        source: "WHO Global Health",
        tags: ["Depression", "Recovery", "WHO", "Mental Health"],
        displayOrder: 5
      },
      {
        title: "Managing Panic Attacks & Acute Anxiety in Daily Life",
        description: "Learn how the nervous system triggers panic attacks and key groundings techniques by NIMH.",
        content: "Panic attacks are sudden surges of intense fear or discomfort that reach a peak within minutes. Symptoms include rapid heartbeat, sweating, trembling, and shortness of breath. Grounding techniques like the 5-4-3-2-1 method and box breathing help activate the parasympathetic nervous system to restore calm.",
        category: "Featured Articles",
        resourceType: "article",
        thumbnailUrl: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
        duration: "8 min read",
        isPremium: false,
        rating: 4.8,
        author: "National Institute of Mental Health (NIMH)",
        source: "NIMH Research",
        tags: ["Anxiety", "Panic Attacks", "NIMH"],
        displayOrder: 6
      },
      {
        title: "Overcoming Social Anxiety & Building Emotional Self-Esteem",
        description: "Mind UK's clinical guide to addressing social fears, fear of judgment, and developing authentic self-worth.",
        content: "Social anxiety involves intense fear of being watched, judged, or criticized in social situations. Cognitive restructuring techniques help challenge distorted self-beliefs and build confidence during everyday interactions.",
        category: "Featured Articles",
        resourceType: "article",
        thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/phobias/social-anxiety/",
        duration: "12 min read",
        isPremium: true,
        rating: 4.9,
        author: "Mind UK",
        source: "Mind UK Mental Health",
        tags: ["Social Anxiety", "Self Esteem", "Mind UK"],
        displayOrder: 7
      },

      // 📺 UNIQUE PREMIUM VIDEO LEARNING LIBRARY
      {
        title: "How to Manage Anxiety & Overthinking - Psych Hub",
        description: "An expert video breakdown of how anxiety functions in the brain and practical daily strategies to quiet an overactive mind.",
        content: "Psych Hub's clinical guide on breaking the cycle of overthinking and managing somatic anxiety symptoms.",
        category: "Videos",
        resourceType: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&auto=format&fit=crop&q=80",
        youtubeUrl: "https://www.youtube.com/watch?v=9mJfD1zV2-o",
        externalUrl: "https://www.youtube.com/watch?v=9mJfD1zV2-o",
        duration: "8 min video",
        isPremium: true,
        rating: 4.9,
        author: "Psych Hub",
        source: "YouTube Clinical Education",
        tags: ["Anxiety", "Video", "Psych Hub", "Overthinking"],
        displayOrder: 8
      },
      {
        title: "Understanding Depression & Brain Chemistry - HealthyGamerGG",
        description: "Dr. Alok Kanojia explains the neurobiology of depression, motivation deficits, and practical steps toward emotional recovery.",
        content: "Educational lecture on neurochemistry, dopamine regulation, and cognitive recovery strategies.",
        category: "Videos",
        resourceType: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80",
        youtubeUrl: "https://www.youtube.com/watch?v=3_g246F_1-M",
        externalUrl: "https://www.youtube.com/watch?v=3_g246F_1-M",
        duration: "15 min video",
        isPremium: true,
        rating: 4.9,
        author: "HealthyGamerGG",
        source: "YouTube Psychiatry",
        tags: ["Depression", "Neuroscience", "Video"],
        displayOrder: 9
      },
      {
        title: "10-Minute Guided Meditation for Stress Relief - Headspace",
        description: "Immerse yourself in a relaxing 10-minute guided mindfulness meditation practice to release physical tension.",
        content: "Guided breathing exercise designed to cultivate calm and release muscle tightness.",
        category: "Meditation & Breathing",
        resourceType: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80",
        youtubeUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
        externalUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
        duration: "10 min practice",
        isPremium: true,
        rating: 4.9,
        author: "Headspace",
        source: "Headspace Mindfulness",
        tags: ["Meditation", "Stress", "Headspace"],
        displayOrder: 10
      },
      {
        title: "The Science of Emotional Resilience & Burnout - TED Talk",
        description: "Discover how top psychological researchers define emotional resilience and tools to recover from burnout.",
        content: "Inspiring TED presentation breaking down stress resilience, emotional agility, and work-life boundaries.",
        category: "Videos",
        resourceType: "video",
        thumbnailUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80",
        youtubeUrl: "https://www.youtube.com/watch?v=e8tClyZ8VfM",
        externalUrl: "https://www.youtube.com/watch?v=e8tClyZ8VfM",
        duration: "14 min video",
        isPremium: true,
        rating: 4.9,
        author: "TED Talks",
        source: "TED Psychological Science",
        tags: ["Resilience", "TED", "Burnout"],
        displayOrder: 11
      },

      // 📝 GUIDED EXERCISES & CBT WORKSHEETS (PREMIUM UNIQUE)
      {
        title: "Box Breathing Protocol (4-4-4-4 Technique)",
        description: "A clinical breathing technique used by medical professionals and tactical teams to regulate acute stress in under 3 minutes.",
        content: "1. Inhale slowly through your nose for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Exhale smoothly through your mouth for 4 seconds.\n4. Hold your lungs empty for 4 seconds.\nRepeat for 4 to 6 cycles.",
        category: "Guided Exercises",
        resourceType: "exercise",
        thumbnailUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.healthline.com/health/box-breathing",
        duration: "5 min exercise",
        isPremium: true,
        rating: 4.9,
        author: "Nirvanic Wellness Lab",
        source: "Clinical Breathing",
        tags: ["Breathing", "Stress Relief", "Box Breathing"],
        displayOrder: 12
      },
      {
        title: "CBT Thought Record & Cognitive Distortion Worksheet",
        description: "Interactive CBT exercise to identify automatic negative thoughts, analyze evidence, and reframe catastrophic thinking.",
        content: "Step 1: Identify the Triggering Event.\nStep 2: Write down the Automatic Thought.\nStep 3: Identify Cognitive Distortions (All-or-Nothing, Catastrophizing, Emotional Reasoning).\nStep 4: Examine Evidence For and Against.\nStep 5: Formulate a Balanced Rational Response.",
        category: "CBT Worksheets",
        resourceType: "worksheet",
        thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.psychologytools.com/resource/cbt-thought-record/",
        duration: "15 min exercise",
        isPremium: true,
        rating: 5.0,
        author: "CBT Therapy Practice",
        source: "Cognitive Psychology",
        tags: ["CBT", "Worksheet", "Thoughts"],
        displayOrder: 13
      },
      {
        title: "Progressive Muscle Relaxation (PMR) Guide",
        description: "Systematically tense and release muscle groups from your toes to your face to release deep physical stress.",
        content: "PMR helps release somatic stress by systematically contracting muscle groups for 5 seconds and releasing them for 10 seconds, focusing on the sensation of warmth and lightness.",
        category: "Guided Exercises",
        resourceType: "exercise",
        thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.anxietycanada.com/articles/how-to-do-progressive-muscle-relaxation/",
        duration: "12 min exercise",
        isPremium: true,
        rating: 4.8,
        author: "Nirvanic Somatics",
        source: "Somatic Health",
        tags: ["PMR", "Relaxation", "Stress"],
        displayOrder: 14
      },
      {
        title: "Sleep Hygiene & Evening Wind-Down Routine",
        description: "Evidence-based habits to prepare your mind and circadian rhythm for restorative night sleep.",
        content: "Learn how setting dark environment temperatures, eliminating blue light 1 hour prior to sleep, and avoiding evening caffeine dramatically improves REM and deep sleep cycles.",
        category: "Sleep Improvement",
        resourceType: "article",
        thumbnailUrl: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.sleepfoundation.org/sleep-hygiene",
        duration: "7 min read",
        isPremium: true,
        rating: 4.8,
        author: "Sleep Science Center",
        source: "Sleep Medicine",
        tags: ["Sleep", "Insomnia", "Routine"],
        displayOrder: 15
      },
      {
        title: "De-Catastrophizing & Worry Challenge Worksheet",
        description: "Structured worksheet to challenge 'worst-case scenario' thinking and evaluate realistic odds.",
        content: "Ask yourself: 1. What is the worst that could happen?\n2. What is the best that could happen?\n3. What is the most realistic scenario?\n4. If the worst happens, what steps can I take to handle it?",
        category: "CBT Worksheets",
        resourceType: "worksheet",
        thumbnailUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
        externalUrl: "https://www.therapistaid.com/therapy-worksheet/de-catastrophizing",
        duration: "10 min worksheet",
        isPremium: true,
        rating: 4.9,
        author: "CBT Therapy Practice",
        source: "Therapist Aid",
        tags: ["CBT", "Worry", "Worksheet"],
        displayOrder: 16
      }
    ];

    // Seed into database
    await resourceModel.deleteMany({});
    const created = await resourceModel.insertMany(sampleResources);

    return res.json({
      success: true,
      message: `Successfully seeded ${created.length} unique mental health resources!`,
      count: created.length
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
