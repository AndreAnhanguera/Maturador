import { z } from 'zod';

export const campaignSchema = z.object({
  name: z.string().min(2),
  template: z.string().min(1),
  chip_id: z.string().uuid().nullable().optional(),
  contact_ids: z.array(z.string().uuid()).default([]),
  interval_seconds: z.number().int().min(1).default(45),
  pause_every: z.number().int().min(1).default(10),
  pause_seconds: z.number().int().min(1).default(300)
});
