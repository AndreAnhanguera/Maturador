import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().optional().nullable(),
  phone_number: z.string().min(8),
  email: z.string().email().optional().nullable().or(z.literal('')),
  tags: z.string().optional().nullable(),
  status: z.string().optional().default('active')
});

export const contactsImportSchema = z.object({
  contacts: z.array(contactSchema).min(1)
});
