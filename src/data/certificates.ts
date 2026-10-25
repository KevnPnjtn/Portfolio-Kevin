
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
        id: "internship",
        title: "Sertifikat Pelatihan",
        issuer: "CertNexus",
        category: "Fullstack Developer Associate",
        period: "21–25 Juli 2026",
        image: "/certificates/sertifikat-pelatihan.jpg",
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

