import { title } from "process";
import { z } from "zod";

export const featureSchema = z.object({
    title: z.string(),
    description: z.string()
})