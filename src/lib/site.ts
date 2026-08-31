export const WHATSAPP_NUMBER = "5511974502226";
export const WHATSAPP_DISPLAY = "(11) 97450-2226";

export const INSTAGRAM_HANDLE = "dechenwebstudio";
export const INSTAGRAM_URL = "https://www.instagram.com/dechenwebstudio";
export const LINKEDIN_URL = "https://www.linkedin.com/in/pedro-dechen";

export const AGENCY = {
  name: "Dechen Web Studio",
  shortName: "Dechen",
  domain: "dechenwebstudio.com.br",
  email: "contato@dechenwebstudio.com.br",
} as const;

export const SITE_URL = `https://${AGENCY.domain}`;
export const SITE_EMAIL = AGENCY.email;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Dechen Web Studio e gostaria de um orçamento.";

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(input: {
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  message: string;
  company?: string;
  website?: string;
}) {
  const lines = [
    "Olá! Vim pelo site da Dechen Web Studio.",
    "",
    `Nome: ${input.name}`,
    `E-mail: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Tipo de negócio: ${input.business}`,
  ];
  if (input.company) lines.push(`Empresa: ${input.company}`);
  if (input.website) lines.push(`Site atual: ${input.website}`);
  lines.push(`Mensagem: ${input.message}`);
  return lines.join("\n");
}
