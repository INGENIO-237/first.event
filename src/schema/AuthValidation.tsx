import * as z from "zod";

export const otpConfirmSchema = z.object({
  otp: z
    .string({ required_error: "Requis" })
    .min(5, { message: "Devrait avoir 5 chiffres" })
    .max(5, { message: "Devrait avoir 5 caracteres" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email requis" })
    .email({ message: "Email invalide" }),
  password: z
    .string({ required_error: "Mot de passe requis" })
    .min(6, { message: "Mot de passe trop court" })
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email requis" })
    .email({ message: "Email invalide" }),
});

export const resetPasswordSchema = z.object({
  otp: z
    .string({ required_error: "Requis" })
    .min(5, { message: "Devrait avoir 5 chiffres" })
    .max(5, { message: "Devrait avoir 5 caractères" }),
  password: z
    .string({ required_error: "Mot de passe requis" })
    .min(6, { message: "Mot de passe trop court" }),
});
export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "L'adresse email est obligatoire." })
      .email({ message: "L'adresse email n'est pas valide" }),
    lastname: z
      .string({ required_error: "Le nom est obligatoire." })
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    firstname: z
      .string({ required_error: "Le prénom est obligatoire." })
      .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    password: z
      .string({ required_error: "Le mot de passe est obligatoire." })
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      }),
    passwordConfirm: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      }),
    acceptedTerms: z.boolean({
      required_error: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  });

export const registerResponseSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  isVerified: z.boolean(),
  hasBeenDeleted: z.boolean(),
  interests: z.array(z.unknown()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});