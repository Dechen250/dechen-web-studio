import { About } from "@/components/divina-cozinha/About";
import { Ambiente } from "@/components/divina-cozinha/Ambiente";
import { Community } from "@/components/divina-cozinha/Community";
import { Flavors } from "@/components/divina-cozinha/Flavors";
import { Footer } from "@/components/divina-cozinha/Footer";
import { Hero } from "@/components/divina-cozinha/Hero";
import { Localizacao } from "@/components/divina-cozinha/Localizacao";
import { Marquee } from "@/components/divina-cozinha/Marquee";
import { MenuBook } from "@/components/divina-cozinha/MenuBook";
import { Navbar } from "@/components/divina-cozinha/Navbar";
import { ReservasForm } from "@/components/divina-cozinha/ReservasForm";
import { Testimonials } from "@/components/divina-cozinha/Testimonials";

export default function DivinaCozinhaPage() {
  return (
    <>
      <div className="bg-grid pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60" />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-[1600px] space-y-4 px-4 pt-32 md:px-8">
        <Hero />
        <Marquee />
        <MenuBook />
        <About />
        <Flavors />
        <Ambiente />
        <Community />
        <Testimonials />
        <ReservasForm />
        <Localizacao />
      </main>
      <Footer />
    </>
  );
}
