import { starbucks, meta, shopify, tesla } from "../assets";

export const presentationMaterial = {
  textureImage: [
    { name: "texture1", texture: "/assets/demo1.jpg" },
    { name: "texture2", texture: "/assets/demo2.jpg" },
    { name: "texture3", texture: "/assets/demo3.jpg" },
    { name: "texture4", texture: "/assets/demo1.jpg" },
    { name: "texture5", texture: "/assets/demo2.jpg" },
    { name: "texture6", texture: "/assets/demo3.jpg" },
  ],
};

export const EMAIL_PLACEHOLDER = {
  email: "Your Email Address",
  message: "Please enter a message",
};

export const CHAT_EMAIL_PLACEHOLDER = {
  email: "Your Email Address",
  message: "Please enter a message",
  phonenumber: "+2547290....",
};

export const experiences = [
  {
    title: "Mobile App Development",
    company_name: "seamless mobile experience",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2026 - April 2026",
    points: [
      "Cross-Platform Excellence: Native-quality iOS and Android applications built efficiently from a single codebase using React Native and Expo.",
      "Fluid User Interfaces: Visually stunning, responsive, and intuitive layouts with smooth animations that keep users engaged.",
      "Offline-First Capabilities: Robust local data caching and synchronization to ensure your app works flawlessly even without a network connection.",
      "App Store Readiness: Full end-to-end management of the deployment process, from code signing to successful Google Play and Apple App Store launch.",
    ],
  },
  {
    title: "Web Applications",
    company_name: "modern web solutions",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2026 - Feb 2026",
    points: [
      "Full-Stack Architecture: Production-ready web applications built on powerful, cutting-edge frameworks like Next.js for ultimate speed and SEO optimization.",
      "Immersive Interactive Experiences: Integration of advanced front-end animations, smooth scrolling, and dynamic elements that make your brand stand out.",
      "Headless CMS & Flexible Content: Content management systems tailored so you can easily update copy, media, and blogs without touching the code.",
      "Secure Backend Integration: Bulletproof authentication, real-time database management, and reliable SMTP email services to handle your business logic safely.",
    ],
  },
  {
    title: "AI Integration",
    company_name: "Automation and Optimization",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2026 - Jan 2026",
    points: [
      "Custom Intent Classification: Tailored Natural Language Processing (NLP) models designed to understand user inputs and route data efficiently.",
      "Real-Time Smart Workflows: Seamless API integrations with LLMs and AI models to automate customer interactions, content generation, or data analysis.",
      "Interactive Data Pipelines: Clear, visual pipelines that process complex data and feed it directly into your application's user interface.",
      "Predictive Features: Smarter user experiences that anticipate user needs based on behavioral data and intelligent pattern recognition.",
    ],
  },
  {
    title: "Database Architecture",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2026 - Present",
    points: [
      "Relational & Real-Time Databases: Implementation of powerful, structured data systems using PostgreSQL and Supabase to handle complex relationships and instant data syncing.",
      "Secure Access & Authentication: Robust user authentication, role-based access control, and row-level security policies to keep user data isolated and protected.",
      "Serverless Workflows & APIs: Designing lightweight, highly scalable edge functions and RESTful APIs that connect your front-end seamlessly to your data layer.",
      "Optimization & Data Integrity: Smart indexing and schema design to ensure queries execute instantly, keeping your application fast even under heavy user loads.",
    ],
  },
];
