export function companyNameFromLead(input: {
  company?: string;
  segment?: string;
  website?: string;
}): string {
  const named = input.company?.trim();
  if (named) return named;

  if (input.website) {
    try {
      return new URL(input.website).hostname.replace(/^www\./, "");
    } catch {
      /* URL já validada na origem na maior parte dos casos */
    }
  }

  return input.segment?.trim() || "Lead do site";
}
