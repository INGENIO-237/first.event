import { isValidUrl } from "@/lib/utils";
import * as z from "zod";

export const ChannelSchema = z.object({
  name: z
    .string({
      required_error: "Le nom est obligatoire",
      invalid_type_error: "Le nom est obligatoire",
    }),
  followers: z
    .string({
      required_error: "Le nombre d'abonnés est obligatoire",
      invalid_type_error: "Le nombre d'abonnés est obligatoire",
    })
    .refine((val) => {
      return !isNaN(parseInt(val));
    }, { message: "Doit être un nombre" })
    .refine((val) => {
      return parseInt(val) > 0;
    }, { message: "Doit être superieur à 0" }),
  link: z
    .string({
      required_error: "Le lien est obligatoire",
      invalid_type_error: "Le lien est obligatoire",
    })
    .refine((val) => {
      return isValidUrl(val);
    }, { message: "Doit etre un lien" })
    // .refine((val) => {
    //   return val.startsWith("http://") || val.startsWith("https://");
    // }, { message: "Le lien doit commencer par http:// ou https://" }),
}).refine((data) => {
  return !(data.name == '' || data.name.trim() == '')
}, { message: "Le nom est obligatoire", path: ["name"] })
  .refine((data) => {
    return !(data.followers == '' || data.followers.trim() == '')
  }, { message: "Le nombre d'abonnés est obligatoire", path: ["followers"] })
  .refine((data) => {
    return !(data.link == '' || data.link.trim() == '')
  }, { message: "Le lien est obligatoire", path: ["link"] });