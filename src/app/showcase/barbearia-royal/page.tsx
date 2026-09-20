import { About } from "@/components/barbearia-royal/About";
import { Booking } from "@/components/barbearia-royal/Booking";
import { Footer } from "@/components/barbearia-royal/Footer";
import { Gallery } from "@/components/barbearia-royal/Gallery";
import { Hero } from "@/components/barbearia-royal/Hero";
import { Instagram } from "@/components/barbearia-royal/Instagram";
import { Marquee } from "@/components/barbearia-royal/Marquee";
import { Navbar } from "@/components/barbearia-royal/Navbar";
import { Services } from "@/components/barbearia-royal/Services";
import { Team } from "@/components/barbearia-royal/Team";
import { Testimonials } from "@/components/barbearia-royal/Testimonials";

export default function BarbeariaRoyalPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <Team />
        <Testimonials />
        <Booking />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
