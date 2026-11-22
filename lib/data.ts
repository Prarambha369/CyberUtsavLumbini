export const SITE_URL = "https://lumbini.cyberutsav.com";
export const REGISTER_URL = "https://registration.cyberutsav.com/butwal";
export const CONTACT_EMAIL = "prarambha@butwalhacks.com";

/** Confirmed Butwal round dates (ISO for structured data, plus display text). */
export const EVENT_START = "2027-01-15";
export const EVENT_END = "2027-01-17";
export const EVENT_DATES = "Jan 15–17, 2027";

/** Registration link tagged with UTM params so sign-ups can be attributed to the CTA that drove them. */
export function registerUrl(placement: string) {
  const params = new URLSearchParams({
    utm_source: "lumbini.cyberutsav.com",
    utm_medium: "website",
    utm_campaign: "lumbini_preregistration",
    utm_content: placement,
  });
  return `${REGISTER_URL}?${params}`;
}

/** Short, answer-first facts. Shown on the page and reused in structured data / llms.txt. */
export const keyFacts = [
  { label: "What", value: "Free 3-day student hackathon — Lumbini Provincial Chapter of CyberUtsav" },
  { label: "Where", value: "Butwal, Lumbini Province, Nepal (venue TBA)" },
  { label: "When", value: "January 15–17, 2027 (3 days)" },
  { label: "Who", value: "High school, A-Levels students & recent graduates" },
  { label: "Team", value: "3 members per team" },
  { label: "Cost", value: "Free — Rs. 0 registration" },
  { label: "Capacity", value: "Up to 150 participants" },
  { label: "Reward", value: "Winners advance to the Kathmandu Grand Finale" },
];

export const tracks = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Digital defense, secure systems, and threat monitoring.",
    examples: ["Phishing awareness", "Secure login systems", "Threat monitoring tools"],
    icon: "shield",
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    description: "Machine learning, data, chatbots, and intelligent automation.",
    examples: ["Chatbots and copilots", "Prediction dashboards", "Computer vision tools"],
    icon: "terminal",
  },
  {
    id: "iot",
    title: "IoT & Hardware",
    description: "Sensor-based projects, smart devices, and hardware builds.",
    examples: ["Smart agriculture", "Health monitoring", "Automation devices"],
    icon: "globe",
  },
  {
    id: "web",
    title: "Web Development",
    description: "Full-stack platforms, APIs, dashboards, and community tools.",
    examples: ["SaaS prototypes", "Community platforms", "Data dashboards"],
    icon: "users",
  },
  {
    id: "social",
    title: "Social Impact",
    description: "Technology for education, health, environment, and accessibility.",
    examples: ["EdTech solutions", "Health access tools", "Climate and civic tech"],
    icon: "heart",
  },
  {
    id: "open",
    title: "Open Innovation",
    description: "Any creative technology project that solves a real problem.",
    examples: ["Creative tools", "FinTech concepts", "Unusual experiments"],
    icon: "sparkles",
  },
];

export const hostCityDetails = [
  { label: "City", value: "Butwal" },
  { label: "Province", value: "Lumbini" },
  { label: "Round", value: "Provincial city qualifier" },
  { label: "Date", value: "Jan 15 – Jan 17, 2027" },
  { label: "Venue", value: "Partner institution · TBA" },
  { label: "Registration", value: "Open now" },
];

export const timeline = [
  {
    phase: "Phase 1",
    title: "Online Workshops",
    description: "Hackathon basics, idea building, Git/GitHub, and pitching.",
  },
  {
    phase: "Phase 2",
    title: "City Rounds",
    description: "3-day hackathons with 12 total hours of project building.",
  },
  {
    phase: "Phase 3",
    title: "Grand Finale",
    description: "City winners compete in Kathmandu for one champion trophy.",
  },
];

export const steps = [
  { step: "01", title: "Register", description: "Form a team of 3 members" },
  { step: "02", title: "Choose Track", description: "Pick your track and draft your idea" },
  { step: "03", title: "Build", description: "Develop your project in the Butwal round" },
  { step: "04", title: "Present", description: "Pitch your final product to the jury" },
];

export const prizes = [
  { title: "Overall Champion", value: "Grand Prize", note: "To be announced" },
  { title: "Track Winners", value: "Per-Track Prize", note: "To be announced" },
  { title: "Every Participant", value: "Swags & Perks", note: "To be announced" },
  { title: "Career Growth", value: "Beyond Cash", note: "To be announced" },
];

export const faqs = [
  {
    question: "What is CyberUtsav Lumbini?",
    answer:
      "CyberUtsav Lumbini is a free, 3-day student hackathon in Butwal, Nepal, running January 15–17, 2027. It is the Lumbini Provincial Chapter of CyberUtsav, Nepal's largest student hackathon series organized by Tech Gurkha Digital Services, and is co-organized by ButwalHacks. Winning teams advance to the Kathmandu Grand Finale.",
  },
  {
    question: "How do I register for CyberUtsav Lumbini?",
    answer:
      "Pre-register online at registration.cyberutsav.com/butwal. It is free and takes less than 2 minutes. Register as a team of 3: one team leader and two members.",
  },
  {
    question: "Is it free to participate?",
    answer: "Yes. CyberUtsav Lumbini is completely free — there is no registration fee.",
  },
  {
    question: "Who can participate?",
    answer:
      "High school students, A-Levels students, and recent graduates can participate. Every team must have exactly 3 members.",
  },
  {
    question: "When and where is CyberUtsav Lumbini?",
    answer:
      "CyberUtsav Lumbini takes place January 15–17, 2027, in Butwal, Lumbini Province, Nepal, at a partner institution. The exact venue will be announced soon — pre-registered teams are notified first.",
  },
  {
    question: "How long is the hackathon?",
    answer:
      "The Butwal round runs for 3 days on-site, January 15–17, 2027, with 12 total hours of project building followed by team pitches to the jury.",
  },
  {
    question: "How many participants can join?",
    answer: "CyberUtsav Lumbini is limited to a maximum of 150 participants (50 teams of 3).",
  },
  {
    question: "What are the competition tracks?",
    answer:
      "There are 6 tracks: Cybersecurity, AI/ML, IoT & Hardware, Web Development, Social Impact, and Open Innovation.",
  },
  {
    question: "What do the winners get?",
    answer:
      "Winning teams from the Butwal round advance directly to the CyberUtsav Grand Finale in Kathmandu to compete for the champion trophy. Prize details for the Lumbini round will be announced once confirmed with sponsors.",
  },
  {
    question: "Is CyberUtsav Lumbini the same as CyberUtsav 3.0?",
    answer:
      "No. CyberUtsav 3.0 is the current edition of the national CyberUtsav series. CyberUtsav Lumbini is one provincial chapter of it — a regional selection round held in Butwal whose winners go on to the national Grand Finale in Kathmandu.",
  },
];

export const countries = [
  "Nepal",
  "India",
  "Bangladesh",
  "UAE",
  "USA",
  "UK",
  "Australia",
  "Japan",
  "Germany",
  "Canada",
  "Other",
];

export const interests = [
  "Cybersecurity",
  "AI / ML",
  "IoT & Hardware",
  "Web Development",
  "Social Impact",
  "Open Innovation",
];

export const teamRoles = [
  "Team Leader",
  "Member",
];

export const team = [
  {
    name: "Prarambha Bashyal",
    role: "Butwal Regional Lead",
    org: "Butwal Chapter",
    initials: "PB",
    color: "var(--red)",
    photo: "/photos/Prarambha.png",
    github: null,
    linkedin: null,
  },
  {
    name: "Hardik Chapagain",
    role: "Content & Communications Lead",
    org: "Butwal Chapter",
    initials: "HC",
    color: "var(--purple)",
    photo: "/photos/Hardik.png",
    github: null,
    linkedin: null,
  },
  {
    name: "Rabin Chudali",
    role: "Strategy & Volunteer Lead",
    org: "Butwal Chapter",
    initials: "RC",
    color: "var(--mint)",
    photo: "/photos/Rabin.png",
    github: null,
    linkedin: null,
  },
  {
    name: "Basanta Aryal",
    role: "Sponsorship & Partnerships Lead",
    org: "Butwal Chapter",
    initials: "BA",
    color: "var(--purple)",
    photo: "/photos/Basanta.png",
    github: null,
    linkedin: null,
  },
  {
    name: "Saksham Gyawali",
    role: "Design & Branding Lead",
    org: "Butwal Chapter",
    initials: "SG",
    color: "var(--red)",
    photo: "/photos/Saksham.png",
    github: null,
    linkedin: null,
  },
  {
    name: "Sangam Kunwar Rana",
    role: "Logistics & Venue Lead",
    org: "Butwal Chapter",
    initials: "SK",
    color: "var(--mint)",
    photo: "/photos/Sangam.png",
    github: null,
    linkedin: null,
  },
];
