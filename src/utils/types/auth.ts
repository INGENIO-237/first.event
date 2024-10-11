import {
    forgotPasswordSchema,
    loginSchema,
    otpConfirmSchema,
    registerResponseSchema,
    registerSchema,
    resetPasswordSchema
} from "@/schema/AuthValidation";
import * as z from "zod";


export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    otpGenerated: boolean;
};
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type forgotPassword = z.infer<typeof forgotPasswordSchema>;

export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export type OTPData = z.infer<typeof otpConfirmSchema>;

export type confirmLoginData = {
    email: string;
    password: string;
    otp: number;
}

export type confirmLoginResponse = {
    accessToken: string;
    refreshToken: string;
    otpGenerated: boolean;
}

export type resendOtpData = {
    email: string;
}

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export type resetPasswordData = {
    email: string;
    otp: number;    
    password: string;
}