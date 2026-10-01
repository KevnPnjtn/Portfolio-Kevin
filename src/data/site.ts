export type Locale = "en" | "id";

export const siteConfig = {
  name: "Kevin Reynaldi Panjaitan",
  // Put these files in /public
  cvPath: "/cv-kevin-reynaldi-panjaitan.pdf",
  profileImage: "/profile.jpg",
  // TODO: replace with the real links
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  instagram: "https://www.instagram.com/your-username",
};

export const navIds = [
] as const;

export type SectionId = (typeof navIds)[number];

const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
  } satisfies Record<SectionId, string>,
  ui: {
    toggleTheme: "Toggle theme",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    opensInNewTab: "opens in a new tab",
  },
  hero: {
    greeting: "Hello, I'm a",
    role: "Informatics Engineering Graduate",
    description:
      "I build web and mobile applications with modern technologies to create practical digital solutions.",
    viewProjects: "View Projects",
    downloadCv: "Download CV",
    badge: "Web Developer & Problem Solver",
    scrollDown: "Scroll Down",
    profileAlt: "Portrait of Kevin Reynaldi Panjaitan",
    socialLabel: "Social links",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  nav: {
    home: "Beranda",
    about: "Tentang",
    skills: "Keahlian",
    experience: "Pengalaman",
    projects: "Proyek",
    education: "Pendidikan",
    contact: "Kontak",
  },
  ui: {
    toggleTheme: "Ganti tema",
    language: "Bahasa",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    mainNav: "Navigasi utama",
    opensInNewTab: "dibuka di tab baru",
  },
  hero: {
    greeting: "Halo, saya",
    role: "Lulusan Teknik Informatika",
    description:
      "Saya membangun aplikasi web dan mobile dengan teknologi modern untuk menciptakan solusi digital yang praktis.",
    viewProjects: "Lihat Proyek",
    downloadCv: "Unduh CV",
    badge: "Web Developer & Problem Solver",
    scrollDown: "Gulir ke Bawah",
    profileAlt: "Potret Kevin Reynaldi Panjaitan",
    socialLabel: "Tautan sosial",
  },
};

export const dictionary: Record<Locale, Dictionary> = { en, id };