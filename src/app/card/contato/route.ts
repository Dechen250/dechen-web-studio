import {
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SITE_EMAIL,
  SITE_URL,
  WHATSAPP_NUMBER,
  cardProfile,
} from "@/lib/site";

export function GET() {
  const tel = `+${WHATSAPP_NUMBER}`;
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${cardProfile.name}`,
    "N:Dechen;Pedro;;;",
    `ORG:${cardProfile.company}`,
    `TITLE:${cardProfile.role}`,
    `TEL;TYPE=CELL,VOICE:${tel}`,
    `EMAIL;TYPE=WORK:${SITE_EMAIL}`,
    `URL:${SITE_URL}`,
    `URL:${SITE_URL}/card`,
    `X-SOCIALPROFILE;TYPE=instagram:${INSTAGRAM_URL}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${LINKEDIN_URL}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pedro-dechen.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
