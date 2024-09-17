import * as z from "zod";
import { isValidPhoneNumber } from 'libphonenumber-js'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CoordonatesSchema = z.object({
    firstname: z.string({ required_error: 'Un prénom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    lastname: z.string({ required_error: 'Un nom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    mobile_phone_number: z.string({ required_error: "Le téléphone portable est requis" }).refine(val => isValidPhoneNumber(val)),
    fix_phone_number: z.string({ required_error: "Le téléphone portable est requis" }).refine(val => isValidPhoneNumber(val)),
    image: z.instanceof(File).optional()
        .refine((file) => file == null || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
            message: "Seules les images de type jpeg, png ou gif sont acceptées !",
        })
        .refine((file) => file == null || file?.size <= 3 * 1000000, {
            message: "L'image ne doit pas dépasser 3MB",
        }),
})