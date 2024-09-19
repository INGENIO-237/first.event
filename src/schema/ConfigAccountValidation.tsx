import * as z from "zod";

export const FirstStepSchema = z.object({
  location: z.string({ required_error: "Localisation Requise!" }),
});
