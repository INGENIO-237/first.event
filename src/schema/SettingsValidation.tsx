import * as z from "zod"

export const CoordonatesSchema = z.object({
    name: z.string({required_error: 'Un nom est obligatoire'}).min(4, {message: 'Minimum 4 lettres'}),
    surname: z.string({required_error: 'Un nom est obligatoire'}).min(4, {message: 'Minimum 4 lettres'}),
    phone_number: z.string()
})