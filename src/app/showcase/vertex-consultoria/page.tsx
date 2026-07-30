import { About } from "@/components/vertex-consultoria/About";
import { Contact } from "@/components/vertex-consultoria/Contact";
import { Footer } from "@/components/vertex-consultoria/Footer";
import { Hero } from "@/components/vertex-consultoria/Hero";
import { Method } from "@/components/vertex-consultoria/Method";
import { Navbar } from "@/components/vertex-consultoria/Navbar";
import { Results } from "@/components/vertex-consultoria/Results";
import { Services } from "@/components/vertex-consultoria/Services";

export default function VertexConsultoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Method />
        <Services />
        <Results />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
