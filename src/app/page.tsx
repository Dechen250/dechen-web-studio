import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { Footer } from "@/components/dws/Footer";
import { Navbar } from "@/components/dws/Navbar";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Work } from "@/components/home/Work";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <div className="relative min-h-full bg-[#050505] font-sans text-white selection:bg-[#0070F3]/30">
      <AmbientBackground />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <div className="relative z-10">
        <Navbar />
        <main id="conteudo">
          <Hero />
          <Work />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </div>
  );
}
