import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { About } from "@/components/about";

export default function Home() {
    return (
        <>
            <Loader />

            <Navbar />

            <main className="relative overflow-hidden bg-background">
                {/* Global Background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0"
                >
                    {/* Dot texture */}
                    <div className="bg-dot-grid absolute inset-0 opacity-[0.12]" />

                    {/* Blue ambient glow */}
                    <div className="absolute left-[10%] top-[5%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.025] blur-[140px]" />

                    {/* Violet ambient glow */}
                    <div className="absolute right-[8%] top-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.02] blur-[140px]" />
                </div>

                {/* Page Content */}
                <div className="relative z-10">
                    <Hero />
                    <About />
                </div>
            </main>

            <Footer />
        </>
    );
}