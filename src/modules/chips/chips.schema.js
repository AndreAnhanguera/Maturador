import { z } from 'zod';

export const chipSchema = z.object({
  name: z.string().min(2),
  phone_number: z.string().min(8),
  provider: z.string().optional().nullable(),
  status: z.string().optional().default('inactive'),
  notes: z.string().optional().nullable()
});
