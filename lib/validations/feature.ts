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

export const featureListSchema = z.array(featureSchema);

export const updateFeatureSchema = z
  .object({
    title: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
