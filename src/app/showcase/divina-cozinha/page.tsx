import { About } from "@/components/divina-cozinha/About";
import { Ambiente } from "@/components/divina-cozinha/Ambiente";
import { Footer } from "@/components/divina-cozinha/Footer";
import { Hero } from "@/components/divina-cozinha/Hero";
import { Localizacao } from "@/components/divina-cozinha/Localizacao";
import { MenuBook } from "@/components/divina-cozinha/MenuBook";
import { Navbar } from "@/components/divina-cozinha/Navbar";
import { ReservasForm } from "@/components/divina-cozinha/ReservasForm";

export default function DivinaCozinhaPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuBook />
        <ReservasForm />
        <Ambiente />
        <About />
        <Localizacao />
      </main>
      <Footer />
    </>
  );
}
