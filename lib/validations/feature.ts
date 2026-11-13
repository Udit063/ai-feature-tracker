import { z } from "zod";

export const featureProposalSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const featureSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
