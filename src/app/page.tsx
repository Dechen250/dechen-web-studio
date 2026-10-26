import { Archivo_Narrow, Oswald } from "next/font/google";
import { BenoistStudio } from "@/components/benoist/BenoistStudio";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-benoist-display",
  display: "swap",
});

const text = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-benoist-text",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${display.variable} ${text.variable}`}>
      <BenoistStudio />
    </div>
  );
}
