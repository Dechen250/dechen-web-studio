import {
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SITE_EMAIL,
  SITE_URL,
  WHATSAPP_CARD_MESSAGE,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  cardProfile,
  whatsappUrl,
} from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44Zm-8.46 18.3h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.43-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.87-9.9 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" strokeWidth="1.7" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cardProfile.name,
  jobTitle: cardProfile.role,
  worksFor: {
    "@type": "Organization",
    name: cardProfile.company,
    url: SITE_URL,
    email: SITE_EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
  },
  url: `${SITE_URL}/card`,
  email: SITE_EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
};

export default function CardPage() {
  return (
    <main className="dws-card">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="dws-card__glow" aria-hidden />
      <div className="dws-card__glow dws-card__glow--side" aria-hidden />
      <article className="dws-card__panel">
        <span className="dws-card__sheen" aria-hidden />
        <div className="dws-card__mark" aria-hidden>
          <span className="relative">DWS</span>
        </div>
        <p className="dws-card__kicker">
          {cardProfile.role} · {cardProfile.company}
        </p>
        <SplitHeading as="h1" immediate className="dws-card__name">
          {cardProfile.name}
        </SplitHeading>
        <p className="dws-card__tagline">{cardProfile.tagline}</p>
        <nav className="dws-card__actions" aria-label="Contato">
          <a
            className="dws-btn dws-btn--primary"
            href={whatsappUrl(WHATSAPP_CARD_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dws-btn__icon">
              <WhatsAppIcon />
            </span>
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a
            className="dws-btn dws-btn--secondary"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dws-btn__icon">
              <InstagramIcon />
            </span>
            Instagram
          </a>
          <a
            className="dws-btn dws-btn--secondary"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dws-btn__icon">
              <LinkedInIcon />
            </span>
            LinkedIn
          </a>
        </nav>
        <p className="dws-card__footer">
          <a href="/card/contato">Salvar contato</a>
          <span className="dws-card__dot" aria-hidden />
          <a href="/">Ver o site</a>
        </p>
      </article>
    </main>
  );
}
