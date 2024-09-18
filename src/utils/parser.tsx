import { AdressValidationSchema, CoordonatesSchema } from '@/schema/SettingsValidation';
import * as z from 'zod';

type addressDataType = z.infer<typeof AdressValidationSchema>
type GeneralInfo = z.infer<typeof CoordonatesSchema>
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
}
export const ParseGeneralData = (data: GeneralInfo) => {