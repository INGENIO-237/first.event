import {forgotPasswordSchema, loginSchema, otpConfirmSchema, registerSchema} from "@/schema/AuthValidation";
import * as z from "zod";


export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    otpGenerated: boolean;
};
export interface RegisterResponse {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    isVerified: boolean;
    hasBeenDeleted: boolean;
    interests: unknown[];
    createdAt: Date;
    updatedAt: Date;
}
export type forgotPassword = z.infer<typeof forgotPasswordSchema>;

export type OTPData = z.infer<typeof otpConfirmSchema>;

export type confirmLoginData = {
    email: string;
    password: string;
    otp: string;
}

export type confirmLoginResponse = {
    accessToken: string;
    refreshToken: string;
    otpGenerated: boolean;
}

export type resendOtpData = {
    email: string;
}
