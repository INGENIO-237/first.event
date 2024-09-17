import * as z from "zod";
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CoordonatesSchema = z.object({
    firstname: z
        .string({ required_error: 'Un prénom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    lastname: z
        .string({ required_error: 'Un nom est obligatoire' }).min(4, { message: 'Minimum 4 lettres' }),
    mobile_phone_number: z
        .string({ required_error: "Le numéro du téléphone portable est requis" }).refine(val => {
            return isValidPhoneNumber(val)
        }, "Numéro de portable invalide"),
    fix_phone_number: z
        .optional(z
            .string({ required_error: "Le numéro du téléphone fixe est requis" })
            .refine(val => {
                return isValidPhoneNumber(val)
            }, "Numéro de téléphone fixe invalide")),
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => {
            console.log(file);
            return !file || ACCEPTED_IMAGE_TYPES.includes(file.type)
        }, {
            message: "Seules les images de type jpeg, png ou gif sont acceptées !",
        })
        .refine((file) => !file || file.size <= 3 * 1000000, {
            message: "L'image ne doit pas dépasser 3MB",
        }),
}).superRefine((data, ctx) => {
    if (data.lastname.trim() == '' || data.firstname.trim() == '') {
        ctx.addIssue({ code: 'custom', message: 'Un nom et un prénom sont obligatoires' })
    }
})

