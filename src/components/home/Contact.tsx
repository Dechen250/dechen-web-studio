import { ContactForm } from "@/components/dws/ContactForm";
import { SECTION } from "@/components/dws/ui";
import { InView } from "@/components/motion/InView";
import { SplitHeading } from "@/components/motion/SplitHeading";
import {
  AGENCY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappUrl,
} from "@/lib/site";

function WhatsAppGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44Zm-8.46 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.43-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.87-9.9 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contato" className={SECTION}>
      <InView className="dws-stagger mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <SplitHeading
            as="h2"
            className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Vamos conversar
          </SplitHeading>
          <SplitHeading
            as="p"
            delayMs={80}
            className="mt-4 max-w-md text-base leading-relaxed text-[#B4B4BE] md:text-lg"
          >
            Conta o que você precisa. A gente responde no WhatsApp, com prazo e
            investimento claros.
          </SplitHeading>

          <div className="mt-8 flex flex-col items-start gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
            >
              <WhatsAppGlyph />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#A1A1AA] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
            >
              Instagram @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={`mailto:${AGENCY.email}`}
              className="text-sm text-[#A1A1AA] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
            >
              {AGENCY.email}
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-[#262626] bg-[#0c0c0c] p-6 sm:p-8">
          <SplitHeading
            as="h3"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Pedir orçamento
          </SplitHeading>
          <SplitHeading
            as="p"
            delayMs={60}
            className="mt-1 mb-6 text-sm text-[#A1A1AA]"
          >
            Preencha e envie direto no WhatsApp.
          </SplitHeading>
          <ContactForm />
        </div>
      </InView>
    </section>
  );
}
