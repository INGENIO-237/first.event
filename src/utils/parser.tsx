import {
  AdressValidationSchema,
  GeneralInfoSchema,
} from "@/schema/SettingsValidation";
import * as z from "zod";

type addressDataType = z.infer<typeof AdressValidationSchema>;
type GeneralInfo = z.infer<typeof GeneralInfoSchema>;
export const parseAddress = (data: addressDataType) => {
  return {
    home: {
      address: data.address,
      country: data.country,
      state: data.province,
      city: data.city,
      zipCode: data.postal_code,
    },
    addresses: {
      billing: {
        content: {
          address: data.billing_address,
          country: data.billing_country,
          state: data.billing_province,
          city: data.billing_city,
          zipCode: data.billing_postal_code,
        },
        sameAsHome: data.billingAsHome,
      },
      shipping: {
        content: {
          address: data.shipping_address,
          country: data.shipping_country,
          state: data.shipping_province,
          city: data.shipping_city,
          zipCode: data.shipping_postal_code,
        },
        sameAsHome: data.shippingAsHome,
      },
    },
  };
};
export const ParseGeneralData = (data: GeneralInfo) => {
  // TODO : send the data to the API in formData
  const formData = new FormData();
  formData.append("firstname", data.firstname);
  formData.append("lastname", data.lastname);
  if (data.image) {
    formData.append("image", data.image);
  }
  formData.append("phone.mobile", data.mobile_phone_number);
  formData.append("phone.home", data.fix_phone_number);
};
