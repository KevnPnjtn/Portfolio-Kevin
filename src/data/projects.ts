
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
    id: "webkita",
    title: "WEBKITA",
    category: "Web Application",
    shortDescription:
      "A digital service platform with rule-based budget estimation for UMKM.",
    description:
      "WEBKITA features a rule-based budget calculator that estimates digital service costs based on user-selected requirements.",
    role: "Project team member",
    images:
      [
        "/projects/webkita/hero-webkita.png",
        "/projects/webkita/webkita-1.png",
        "/projects/webkita/webkita-2.png",
        "/projects/webkita/webkita-3.png",
      ],
    techStack: ["React", "TypeScript", "Supabase", "REST API"],
    features: [
      "Rule-based budget estimation",
      "Service package and feature selection",
      "Client order and payment workflow",
      "Admin package and order management",
    ],

  },
  {
    id: "inventori",
    title: "Warehouse Management System",
    category: "Web Application",
    shortDescription: "Replace this with your actual project summary.",
    description: "Add the actual project description here.",
    role: "Add your actual role and contributions.",
    images: [
      "/projects/inventori/inventori-1.png",
      "/projects/inventori/inventori-2.png",
      "/projects/inventori/inventori-3.png",
      "/projects/inventori/inventori-4.png",
      "/projects/inventori/inventori-5.png",
    ],
    techStack: [],
    features: [],
  },
  {
    id: "guideme-mobile",
    title: "Guide Me",
    category: "Mobile Application",
    shortDescription:
      "A tourism application for discovering destinations, events, galleries, and ticketing.",
    description:
      "Guide Me is a tourism application designed to help users explore destinations, discover tourism events, browse galleries, and order tickets online.",
    role: "Project team member",
    images: [
      "/images/projects/guideme-mobile/cover.png",
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
