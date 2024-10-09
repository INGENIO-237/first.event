import { forgotPasswordSchema, loginSchema, otpConfirmSchema } from "@/schema/AuthValidation";
import * as z from "zod";


export type LoginData = z.infer<typeof loginSchema>;

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    otpGenerated: boolean;
};

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
}

export type resendOtpData = {
    email: string;
}
