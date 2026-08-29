export const SITE_URL = "https://dechenwebstudio.com.br";
export const SITE_EMAIL = "contato@dechenwebstudio.com.br";

export const WHATSAPP_NUMBER = "5511974502226";
export const WHATSAPP_DISPLAY = "(11) 97450-2226";

export const INSTAGRAM_HANDLE = "dechenwebstudio";
export const INSTAGRAM_URL = "https://www.instagram.com/dechenwebstudio";
export const LINKEDIN_URL = "https://www.linkedin.com/in/pedro-dechen";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Dechen Web Studio e gostaria de um orçamento.";

export const WHATSAPP_CARD_MESSAGE =
  "Olá! Troquei contato pelo seu cartão e quero conversar.";

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const cardProfile = {
  name: "Pedro Dechen",
  role: "Fundador",
  company: "Dechen Web Studio",
  tagline: "Sites premium para negócios que precisam transmitir confiança.",
};

export function buildQuoteMessage(input: {
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  message: string;
}) {
  return [
    "Olá! Vim pelo site da Dechen Web Studio.",
    "",
    `Nome: ${input.name}`,
    `E-mail: ${input.email}`,
    `WhatsApp: ${input.whatsapp}`,
    `Tipo de negócio: ${input.business}`,
    `Mensagem: ${input.message}`,
  ].join("\n");
}
