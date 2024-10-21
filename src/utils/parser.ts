import { AdressValidationSchema, GeneralInfoSchema } from "@/schema/SettingsValidation";
import * as z from "zod";
import { LoginData, OTPData } from "./types/auth";
import { SelectedInterest } from "./types/setup";

type addressDataType = z.infer<typeof AdressValidationSchema>;
type GeneralInfo = z.infer<typeof GeneralInfoSchema>;
export const parseAddress = (data: addressDataType) => {
  return {
    "home": {
      "address": data.address,
      "country": data.country,
      "state": data.province,
      "city": data.city,
      "zipCode": data.postal_code,
    },
    "addresses": {
      "billing": {
        "content": {
          "address": data.billing_address,
          "country": data.billing_country,
          "state": data.billing_province,
          "city": data.billing_city,
          "zipCode": data.billing_postal_code,
        },
        "sameAsHome": data.billingAsHome,
      },
      "shipping": {
        "content": {
          "address": data.shipping_address,
          "country": data.shipping_country,
          "state": data.shipping_province,
          "city": data.shipping_city,
          "zipCode": data.shipping_postal_code,
        },
        "sameAsHome": data.shippingAsHome,
      },
    },
  };
};

export const ParseGeneralData = (data: GeneralInfo) => {
  const formData = new FormData();
  formData.append("firstname", data.firstname);
  formData.append("lastname", data.lastname);
  if (data.image) {
    formData.append("image", data.image);
  }
  formData.append("phone.mobile", data.mobile_phone_number);
  formData.append("phone.home", data.fix_phone_number);

  return formData;
};

export const ParseOrganizerData = (exp: string, pastTeam: string, participation: string, targetYear: string, goals: string[]) => {
  return {
    "experience": exp,
    "pastTeam": pastTeam,
    "participation": participation,
    "targetYearEvent": targetYear,
    "goals": goals,
  };
}

export const parseInterestToRetrieveOrganizers = (interests: SelectedInterest[]) => {
  return interests.map((interest) => {
    return {
      "name": interest.interest,
      "tags": interest.tags,
    };
  });
}

export const parseConfirmOtp = (otp: OTPData, loginInfo: LoginData) => {
  return {
    "email": loginInfo.email,
    "otp": otp.otp,
    "password": loginInfo.password,
  };
}