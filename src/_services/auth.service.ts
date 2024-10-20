import server from "@/lib/server";
import {
    confirmLoginData,
    forgotPasswordData,
    LoginData,
    LoginResponse,
    RegisterData,
    RegisterResponse,
    resendOtpData,
    resetPasswordData
} from "@/utils/types/auth";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { registerResponseSchema } from "@/schema/AuthValidation";


export function useRegister() {
    const dispatch = useDispatch();
    const register = async (data: RegisterData) => {
        const response = await server().post("/accounts/register", data);
        return registerResponseSchema.parse(response.data);
    };

    const mutation = useMutation<RegisterResponse, Error, RegisterData>({
        mutationFn: register,
        onSuccess: (data) => {
            dispatch({ type: 'USER_REGISTERED', payload: data });
        },
        onError: (error) => {
            dispatch({ type: 'REGISTER_ERROR', payload: error.message });
        },
    });

    return {
        registerUser: mutation.mutateAsync,
        data: mutation.data,
        error: mutation.error,
        isPending: mutation.isPending,
    };
}

export function useLogin() {
    const login = async (data: LoginData) => {
        const response = await server().post("/auth/login", data);
        return response.data as LoginResponse;
    }

    const {
        mutateAsync: loginUser,
        data,
        error,
        isPending
    } = useMutation<LoginResponse, DefaultError, LoginData>({
        mutationFn: login,
        onSuccess: ((data)=>{
            
        })

    });

    return { loginUser, data, error, isPending };
}

export function useGetCurrentUser() {

    const retrieveCurrentUser = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await server({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        })
            .get("/auth/current");
        return response.data;
    }

    const {
        mutateAsync: getCurrentUser,
        data,
        error,
        isPending
    } = useMutation<any, DefaultError>({ mutationFn: retrieveCurrentUser });

    return { getCurrentUser, data, error, isPending };
}

export function useLoginWithOtp() {
    const confirmOtp = async (data: confirmLoginData) => {
        const response = await server()
            .post("/auth/login", data);
        return response.data;
    }

    const { mutateAsync: confirmLogin, data, error, isPending } = useMutation<LoginResponse, DefaultError, confirmLoginData>({ mutationFn: confirmOtp });

    return { confirmLogin, data, error, isPending };
}

export function useResendOtp() {
    const askOtp = async (data: resendOtpData) => {
        const response: AxiosResponse = await server()
            .post("/auth/resend-otp", data);
        return response.data;
    }
    const {
        mutateAsync: resendOtp,
        data,
        error,
        isPending
    } = useMutation<any, DefaultError, resendOtpData>({ mutationFn: askOtp });
    return { resendOtp, data, error, isPending };
}

export function useForgotPassword() {
    const forgotPassword = async (data: forgotPasswordData) => {
        const response = await server()
            .post("/auth/forgot-password", data);
        return response.data;
    }
    const { mutateAsync: askForgotPassword, data, error, isPending } = useMutation<any, DefaultError, forgotPasswordData>({ mutationFn: forgotPassword });

    return { askForgotPassword, data, error, isPending };
}

export function useResetPassword() {
    const askResetPassword = async (data: resetPasswordData) => {
        const response = await server()
            .post("/auth/reset-password", data);
        return response.data;
    }
    const { mutateAsync: resetPassword, data, error, isPending } = useMutation<any, DefaultError, resetPasswordData>({ mutationFn: askResetPassword });

    return { resetPassword, data, error, isPending };
}

