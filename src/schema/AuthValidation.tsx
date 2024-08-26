import * as z from "zod"

export const otpConfirmSchema = z.object({
    otp: z.string({ required_error: 'Requis' }).min(5, { message: 'Devrait avoir 5 chiffres' }).max(5, { message: 'Devrait avoir 5 caracteres' })
});

export const loginSchema = z.object({
    email: z.string({ required_error: "Email requis" }).email({ message: "Email invalide" }),
    password: z.string({ required_error: "Mot de passe requis" }).min(6, { message: 'Mot de passe trop court' }),
});

export const forgotPasswordSchema = z.object({
    email: z.string({ required_error: "Email requis" }).email({ message: "Email invalide" }),
});

export const resetPasswordSchema = z.object({
    otp: z.string({ required_error: 'Requis' }).min(5, { message: 'Devrait avoir 5 chiffres' }).max(5, { message: 'Devrait avoir 5 caracteres' }),
    password: z.string({ required_error: "Mot de passe requis" }).min(6, { message: 'Mot de passe trop court' }),
})