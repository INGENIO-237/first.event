import * as z from "zod"

export const FirstSchema = z.object({
    location: z.string({ required_error: "Localisation Requise!" }),
}) 