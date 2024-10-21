import { isValidPhoneNumber } from "libphonenumber-js";
import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const isFileInstance = typeof File !== "undefined" ? File : null;

export const GeneralInfoSchema = z
  .object({
    firstname: z
      .string({ required_error: "Un prénom est obligatoire" })
      .min(4, { message: "Minimum 4 lettres" })
      .refine((val) => val.trim(), "Le nom est obligatoire "),
    lastname: z
      .string({ required_error: "Un nom est obligatoire" })
      .min(4, { message: "Minimum 4 lettres" })
      .refine((val) => val.trim(), "Le prenom est obligatoire "),
    mobile_phone_number: z
      .string({ required_error: "Le numéro du téléphone portable est requis" })
      .refine((val) => {
        return isValidPhoneNumber(val);
      }, "Numéro de portable invalide"),
    fix_phone_number: z
      .string({ required_error: "Le numéro du téléphone fixe est requis" })
      .refine((val) => {
        return isValidPhoneNumber(val);
      }, "Numéro de téléphone fixe invalide"),
    image: isFileInstance
      ? z
          .instanceof(File)
          .optional()
          .refine(
            (file) => {
              return !file || ACCEPTED_IMAGE_TYPES.includes(file.type);
            },
            {
              message:
                "Seules les images de type jpeg, png ou gif sont acceptées !",
            }
          )
          .refine((file) => !file || file.size <= 3 * 1000000, {
            message: "L'image ne doit pas dépasser 3MB",
          })
      : z.any().optional(),
  })
  .refine(
    (data) => {
      return data.firstname.trim() == "";
    },
    {
      message: "Au moins 4 caractères pour le prénom pas juste des espaces",
      path: ["firstname"],
    }
  )
  .refine(
    (data) => {
      return data.lastname.trim() == "";
    },
    {
      message: "Au moins 4 caractères pour le nom pas juste des espaces",
      path: ["lastname"],
    }
  );

export const AdressValidationSchema = z
  .object({
    address: z.string({
      required_error: "Adresse du domicile obligatoire.",
      invalid_type_error: "Adresse du domicile obligatoire.",
    }),
    country: z.string({
      required_error: "Pays du domicile obligatoire.",
      invalid_type_error: "Pays du domicile obligatoire.",
    }),
    city: z.string({
      required_error: "La ville est obligatoire.",
      invalid_type_error: "La ville est obligatoire.",
    }),
    province: z.string({
      required_error: "La province est obligatoire.",
      invalid_type_error: "La province est obligatoire.",
    }),
    postal_code: z.string(
      /* { required_error: "Code Postale requis." } */ {
        invalid_type_error: "Code Postale requis.",
      }
    ),
    billing_address: z.string().optional(),
    billing_country: z.string().optional(),
    billing_city: z.string().optional(),
    billing_province: z.string().optional(),
    billing_postal_code: z.string().optional(),
    billingAsHome: z.boolean({
      invalid_type_error:
        "La reponse envoye ne correspond aux valers attendues",
    }),
    shipping_address: z.string().optional(),
    shipping_country: z.string().optional(),
    shipping_city: z.string().optional(),
    shipping_province: z.string().optional(),
    shipping_postal_code: z.string().optional(),
    shippingAsHome: z.boolean({
      invalid_type_error:
        "La reponse envoye ne correspond aux valers attendues",
    }),
  })
  .refine(
    (data) => {
      return !(!data.billingAsHome && data.billing_address == "");
    },
    { message: "Adresse de facturation obligatoire", path: ["billing_address"] }
  )
  .refine(
    (data) => {
      return !(!data.billingAsHome && data.billing_city == "");
    },
    { message: "Ville de facturation obligatoire", path: ["billing_city"] }
  )
  .refine(
    (data) => {
      return !(!data.billingAsHome && data.billing_country == "");
    },
    { message: "Pays de facturation obligatoire", path: ["billing_country"] }
  )
  .refine(
    (data) => {
      return !(!data.billingAsHome && data.billing_postal_code == "");
    },
    {
      message: "Code postal de facturation obligatoire",
      path: ["billing_postal_code"],
    }
  )
  .refine(
    (data) => {
      return !(!data.billingAsHome && data.billing_province == "");
    },
    {
      message: "Province de facturation obligatoire",
      path: ["billing_province"],
    }
  )
  .refine(
    (data) => {
      return !(!data.shippingAsHome && data.shipping_address == "");
    },
    { message: "Adresse de livraison obligatoire", path: ["shipping_address"] }
  )
  .refine(
    (data) => {
      return !(!data.shippingAsHome && data.shipping_city == "");
    },
    { message: "Ville de livraison obligatoire", path: ["shipping_city"] }
  )
  .refine(
    (data) => {
      return !(!data.shippingAsHome && data.shipping_country == "");
    },
    { message: "Pays de livraison obligatoire", path: ["shipping_country"] }
  )
  .refine(
    (data) => {
      return !(!data.shippingAsHome && data.shipping_postal_code == "");
    },
    {
      message: "Code postale de livraison obligatoire",
      path: ["shipping_postal_code"],
    }
  )
  .refine(
    (data) => {
      return !(!data.shippingAsHome && data.shipping_province == "");
    },
    {
      message: "Province de livraison obligatoire",
      path: ["shipping_province"],
    }
  )
  .refine(
    (data) => {
      return !(data.address == "" || data.address.trim() == "");
    },
    { message: "Adresse obligatoire", path: ["address"] }
  )
  .refine(
    (data) => {
      return !(data.city == "" || data.city.trim() == "");
    },
    { message: "Ville obligatoire", path: ["city"] }
  )
  .refine(
    (data) => {
      return !(data.country == "" || data.country.trim() == "");
    },
    { message: "Pays obligatoire", path: ["country"] }
  )
  .refine(
    (data) => {
      return !(data.postal_code == "" || data.postal_code.trim() == "");
    },
    { message: "Code postal obligatoire", path: ["postal_code"] }
  )
  .refine(
    (data) => {
      return !(data.province == "" || data.province.trim() == "");
    },
    { message: "Province obligatoire", path: ["province"] }
  );
