
export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  shortDescription: string;
  description: string;
  role: string;
  images: string[];
  techStack: string[];
  features: string[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "guide-me",
    title: "Guide Me",
    category: "Mobile Application",
    shortDescription:
      "A tourism application for discovering destinations, events, galleries, and ticketing.",
    description:
      "Guide Me is a tourism application designed to help users explore destinations, discover tourism events, browse galleries, and order tickets online.",
    role: "Project team member",
    images: [
      "/images/projects/guide-me/cover.png",
      // Add more screenshot paths here.
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    features: [
      "Tourism destination discovery",
      "Tourism events and galleries",
      "Online ticket ordering",
      "Firebase-based application services",
    ],
  },
  {
    id: "webkita",
    title: "WEBKITA",
    category: "Web Application",
    shortDescription:
      "A digital service platform with rule-based budget estimation for UMKM.",
    description:
      "WEBKITA features a rule-based budget calculator that estimates digital service costs based on user-selected requirements.",
    role: "Project team member",
    images: ["/images/projects/webkita/cover.png"],
    techStack: ["React", "TypeScript", "Supabase", "REST API"],
    features: [
      "Rule-based budget estimation",
      "Service package and feature selection",
      "Client order and payment workflow",
      "Admin package and order management",
    ],
  },
  {
    id: "project-3",
    title: "Project Three",
    category: "Web Application",
    shortDescription: "Replace this with your actual project summary.",
    description: "Add the actual project description here.",
    role: "Add your actual role and contributions.",
    images: [],
    techStack: [],
    features: [],
  },
  {
    id: "project-4",
    title: "Project Four",
    category: "Mobile Application",
    shortDescription: "Replace this with your actual project summary.",
    description: "Add the actual project description here.",
    role: "Add your actual role and contributions.",
    images: [],
    techStack: [],
    features: [],
  },
  {
    id: "project-5",
    title: "Project Five",
    category: "Web Application",
    shortDescription: "Replace this with your actual project summary.",
    description: "Add the actual project description here.",
    role: "Add your actual role and contributions.",
    images: [],
    techStack: [],
    features: [],
  },
  {
    id: "project-6",
    title: "Project Six",
    category: "Other",
    shortDescription: "Replace this with your actual project summary.",
    description: "Add the actual project description here.",
    role: "Add your actual role and contributions.",
    images: [],
    techStack: [],
    features: [],
  },
];
