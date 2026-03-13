import { z } from 'zod';

export const sendMessageSchema = z.object({
  campaign_id: z.string().uuid().nullable().optional(),
  contact_id: z.string().uuid().nullable().optional(),
  instance_id: z.string().uuid().nullable().optional(),
  instance_name: z.string().min(2),
  number: z.string().min(8),
  text: z.string().min(1)
});
