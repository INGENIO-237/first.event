import * as z from "zod";
import { isValidPhoneNumber } from 'libphonenumber-js'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CoordonatesSchema = z.object({
    firstname: z.string({ required_error: 'Un prénom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    lastname: z.string({ required_error: 'Un nom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    mobile_phone_number: z.string({ required_error: "Le téléphone portable est requis" }).refine(val => isValidPhoneNumber(val)),
    fix_phone_number: z.string({ required_error: "Le téléphone portable est requis" }).refine(val => isValidPhoneNumber(val)),
    image: z.instanceof(File)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Juste les images sont acceptés !")
        .refine((file) => file.size > 3*1000000, "The file " ),
})