import ax from "@/lib/server";
import { confirmLoginData, confirmLoginResponse, LoginData, LoginResponse, resendOtpData } from "@/utils/types/auth";
import { DefaultError, useMutation } from "@tanstack/react-query";

export function useLogin() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const login = async (data: LoginData) => {
        const response = await ax({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        }).post("/auth/login", data);
        return response.data as LoginResponse;
    }

    const { mutateAsync: loginUser, data, error, isPending } = useMutation<LoginResponse, DefaultError, LoginData>({ mutationFn: login });

    return { loginUser, data, error, isPending };
}

export function useGetCurrentUser() {

    const retrieveCurrentUser = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await ax({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        }).get("/auth/current");
        return response.data;
    }

    const { mutateAsync: getCurrentUser, data, error, isPending } = useMutation<any, DefaultError>({ mutationFn: retrieveCurrentUser });

    return { getCurrentUser, data, error, isPending };
}

export function useLoginWithOtp() {

    const confirmOtp = async (data: confirmLoginData) => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await ax({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        }).post("/auth/login", data);
        return response.data;
    }

    const { mutateAsync: confirmlogin, data, error, isPending } = useMutation<confirmLoginResponse, DefaultError, confirmLoginData>({ mutationFn: confirmOtp });

    return { confirmOtp, data, error, isPending };
}

export function useResendOtp() {
    const askOtp = async (data: resendOtpData) => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await ax({
            'Authorization': accessToken ? `Bearer ${accessToken}` : null,
            ["x-refresh"]: refreshToken ? refreshToken : null
        }).post("/auth/resend-otp", data);
        return response.data;
    }
    const { mutateAsync: resendOtp, data, error, isPending } = useMutation<resendOtpData, DefaultError, resendOtpData>({ mutationFn: askOtp });
    return { resendOtp, data, error, isPending };
}