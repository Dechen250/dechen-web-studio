import { About } from "@/components/nn-estetica-beleza/About";
import { Appointment } from "@/components/nn-estetica-beleza/Appointment";
import { FAQ } from "@/components/nn-estetica-beleza/FAQ";
import { Footer } from "@/components/nn-estetica-beleza/Footer";
import { Hero } from "@/components/nn-estetica-beleza/Hero";
import { HowItWorks } from "@/components/nn-estetica-beleza/HowItWorks";
import { Location } from "@/components/nn-estetica-beleza/Location";
import { Navbar } from "@/components/nn-estetica-beleza/Navbar";
import { Space } from "@/components/nn-estetica-beleza/Space";
import { Treatments } from "@/components/nn-estetica-beleza/Treatments";
import { WhatsAppFloat } from "@/components/nn-estetica-beleza/WhatsAppFloat";

export default function NnEsteticaPropostaPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Treatments />
        <About />
        <HowItWorks />
        <Space />
        <FAQ />
        <Appointment />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
