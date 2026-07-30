import { Appointment } from "@/components/instituto-harmonia/Appointment";
import { Footer } from "@/components/instituto-harmonia/Footer";
import { Hero } from "@/components/instituto-harmonia/Hero";
import { HowItWorks } from "@/components/instituto-harmonia/HowItWorks";
import { Location } from "@/components/instituto-harmonia/Location";
import { Navbar } from "@/components/instituto-harmonia/Navbar";
import { Specialties } from "@/components/instituto-harmonia/Specialties";
import { Team } from "@/components/instituto-harmonia/Team";

export default function InstitutoHarmoniaPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Specialties />
        <Team />
        <HowItWorks />
        <Appointment />
        <Location />
      </main>
      <Footer />
    </>
  );
}
