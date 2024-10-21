import {
    forgotPasswordSchema,
    loginSchema,
    otpConfirmSchema,
    registerResponseSchema,
    registerSchema,
    resetPasswordSchema
} from "@/schema/AuthValidation";
import * as z from "zod";
import { SelectedInterest } from "./setup";

export type LoginData = z.infer<typeof loginSchema>;

export type RegisterData = z.infer<typeof registerSchema>

export type LoginResponse = {
    accessToken: string,
    refreshToken: string,
    otpGenerated: boolean,
};

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export type forgotPassword = z.infer<typeof forgotPasswordSchema>;

export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export type OTPData = z.infer<typeof otpConfirmSchema>;

export type confirmLoginData = {
    email: string,
    password: string,
    otp: number,
}

export type resendOtpData = {
    email: string,
}

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export type resetPasswordData = {
    email: string,
    otp: number,
    password: string,
}

export interface User {
    email: string,
    password: string,
    image: string,
    firstname: string,
    lastname: string,
    stripeCustomer: string,
    phones: {
        home: string,
        mobile: string,
    },
    home?: Address,
    addresses?: {
        billing: {
            content: Address,
            sameAsHome: boolean,
        },
        shipping: {
            content: Address,
            sameAsHome: boolean,
        },
    },
    professional: string,
    profile: string,
    otp: Number,
    otpExpiry: Date,
    isVerified: boolean,
    hasBeenDeleted: boolean,
    interests: SelectedInterest[] | [],
    oAuth?: {
        oAuthId: String,
        oAuthProvider: string
    }
    created_at: Date,
    updated_at: Date,
}

interface Address {
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
};

export interface AuthState {
    status: string,
    error: string | null,
    accessToken: string | null,
    refreshToken: string | null,
    otpGenerated: boolean,
    currentUser?: User,
    userFetched: boolean,
}

export enum OAUTH_PROVIDER {
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    APPLE = "APPLE",
}

export enum PROFILE {
    INFLUENCER = "Influencer",
    ORGANIZER = "Organizer",
}