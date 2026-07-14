import { Differentials } from "@/components/barbearia-royal/Differentials";
import { Experience } from "@/components/barbearia-royal/Experience";
import { FinalCTA } from "@/components/barbearia-royal/FinalCTA";
import { Footer } from "@/components/barbearia-royal/Footer";
import { Gallery } from "@/components/barbearia-royal/Gallery";
import { Hero } from "@/components/barbearia-royal/Hero";
import { Navbar } from "@/components/barbearia-royal/Navbar";
import { Services } from "@/components/barbearia-royal/Services";
import { Testimonials } from "@/components/barbearia-royal/Testimonials";

export default function BarbeariaRoyalPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Differentials />
        <Services />
        <Experience />
        <Testimonials />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
