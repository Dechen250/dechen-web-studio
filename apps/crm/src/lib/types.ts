export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  segment: string;
  website: string;
  message: string;
  origin: string;
};

export type IngestBody = {
  name?: string;
  email?: string;
  whatsapp?: string;
  company?: string;
  segment?: string;
  website?: string;
  message?: string;
  origin?: string;
};
