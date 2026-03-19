import { z } from 'zod';

export const instanceSchema = z.object({
  chip_id: z.string().uuid().nullable().optional(),
  instance_name: z.string().min(2)
});
