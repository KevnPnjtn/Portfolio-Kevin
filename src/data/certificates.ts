
export type Certificate = {
    id: string;
    title: string;
    issuer: string;
    category: string;
    period?: string;
    image: string;
    description: string;
    learnings: string[];
    skills: string[];
};

export const certificates: Certificate[] = [
    {
        id: "pelatihan",
        title: "Sertifikat Pelatihan",
        issuer: "CertNexus",
        category: "Fullstack Developer Associate",
        period: "2026",
        image: "/certificates/sertifikat-pelatihan.webp",
        description:
            "Mengikuti program pelatihan Fullstack Developer pada 21–23 Juli 2026 melalui sesi pembelajaran daring bersama instruktur menggunakan Zoom. Program ini mencakup kegiatan pembelajaran untuk mengembangkan pengetahuan dan keterampilan praktis dalam pengembangan aplikasi full-stack. Pada 25 Juli 2026, program diakhiri dengan ujian tertulis dan pengumpulan proyek untuk menunjukkan penerapan pengetahuan serta keterampilan yang telah diperoleh selama pelatihan.",
        learnings: [
            "Mengikuti sesi pelatihan daring bersama instruktur melalui Zoom",
            "Mengerjakan ujian tertulis pada 25 Juli 2026",
            "Menyusun dan mengumpulkan proyek sebagai bagian dari penilaian pelatihan",
        ],
        skills: ["Pengembangan Full-stack", "Pengembangan Web"],
    },

    {
        id: "lomba",
        title: "Juara 1 KMIPN VII 2025",
        issuer: "Politeknik Negeri Padang",
        category: "Perencanaan Bisnis Bidang TIK",
        period: "2025",
        image: "/certificates/sertifikat-kmipn.webp",
        description:
            "Meraih Juara 1 pada kategori (Prototype) Perencanaan Bisnis Bidang TIK dalam Kompetisi Mahasiswa Informatika Politeknik Nasional (KMIPN) VII tahun 2025 melalui proyek WebKita, sebuah konsep layanan digital yang dikembangkan untuk membantu UMKM dan perusahaan memenuhi kebutuhan pengembangan website dan aplikasi mobile. Dalam proyek tim ini, saya berkontribusi dalam pengembangan WebKita sebagai media untuk merealisasikan gagasan bisnis digital, dengan pendekatan layanan modular yang fleksibel, terjangkau, dan dapat disesuaikan dengan kebutuhan klien.",
        learnings: [
            "Mengembangkan gagasan bisnis digital menjadi konsep layanan teknologi yang terstruktur",
            "Merancang solusi pengembangan website dan aplikasi mobile untuk kebutuhan UMKM dan perusahaan",
            "Berkolaborasi dalam tim untuk menyusun proposal dan mempresentasikan inovasi bisnis berbasis teknologi",
        ],
        skills: [
            "Perencanaan Bisnis TIK",
            "Pengembangan Web",
            "Inovasi Digital",
            "Kolaborasi Tim",
        ],
    },

    {
        id: "magang",
        title: "Sertifikat Magang",
        issuer: "PT Harapan Jaya Sentosa",
        category: "Magang",
        period: "2025-2026",
        image: "/certificates/sertifikat-magang.webp",
        description:
            "Mengikuti program pelatihan Fullstack Developer pada 21–23 Juli 2026 melalui sesi pembelajaran daring bersama instruktur menggunakan Zoom. Program ini mencakup kegiatan pembelajaran untuk mengembangkan pengetahuan dan keterampilan praktis dalam pengembangan aplikasi full-stack. Pada 25 Juli 2026, program diakhiri dengan ujian tertulis dan pengumpulan proyek untuk menunjukkan penerapan pengetahuan serta keterampilan yang telah diperoleh selama pelatihan.",
        learnings: [
            "Mengikuti sesi pelatihan daring bersama instruktur melalui Zoom",
            "Mengerjakan ujian tertulis pada 25 Juli 2026",
            "Menyusun dan mengumpulkan proyek sebagai bagian dari penilaian pelatihan",
        ],
        skills: ["Pengembangan Full-stack", "Pengembangan Web"],
    },

    {
        id: "sems4",
        title: "Sertifikat Project Based Learning (PBL)",
        issuer: "Politeknik Negeri Batam",
        category: "Magang",
        period: "2025",
        image: "/certificates/sertifikat-pbl-sems4.webp",
        description:
            "Mengikuti program pelatihan Fullstack Developer pada 21–23 Juli 2026 melalui sesi pembelajaran daring bersama instruktur menggunakan Zoom. Program ini mencakup kegiatan pembelajaran untuk mengembangkan pengetahuan dan keterampilan praktis dalam pengembangan aplikasi full-stack. Pada 25 Juli 2026, program diakhiri dengan ujian tertulis dan pengumpulan proyek untuk menunjukkan penerapan pengetahuan serta keterampilan yang telah diperoleh selama pelatihan.",
        learnings: [
            "Mengikuti sesi pelatihan daring bersama instruktur melalui Zoom",
            "Mengerjakan ujian tertulis pada 25 Juli 2026",
            "Menyusun dan mengumpulkan proyek sebagai bagian dari penilaian pelatihan",
        ],
        skills: ["Pengembangan Full-stack", "Pengembangan Web"],
    },

    {
        id: "sems3",
        title: "Sertifikat Project Based Learning (PBL)",
        issuer: "Politeknik Negeri Batam",
        category: "Magang",
        period: "2024",
        image: "/certificates/sertifikat-pbl-sems3.webp",
        description:
            "Mengikuti program pelatihan Fullstack Developer pada 21–23 Juli 2026 melalui sesi pembelajaran daring bersama instruktur menggunakan Zoom. Program ini mencakup kegiatan pembelajaran untuk mengembangkan pengetahuan dan keterampilan praktis dalam pengembangan aplikasi full-stack. Pada 25 Juli 2026, program diakhiri dengan ujian tertulis dan pengumpulan proyek untuk menunjukkan penerapan pengetahuan serta keterampilan yang telah diperoleh selama pelatihan.",
        learnings: [
            "Mengikuti sesi pelatihan daring bersama instruktur melalui Zoom",
            "Mengerjakan ujian tertulis pada 25 Juli 2026",
            "Menyusun dan mengumpulkan proyek sebagai bagian dari penilaian pelatihan",
        ],
        skills: ["Pengembangan Full-stack", "Pengembangan Web"],
    },
];

