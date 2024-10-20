import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "@/lib/server";
import { LoginResponse, User } from '@/utils/types/auth';

interface RegisterData {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}


interface ErrorResponse {
    message: string;
    field?: string;
}

export const registerUser = createAsyncThunk<
    User,
    RegisterData,
    { rejectValue: ErrorResponse }
>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await server()
                .post('/accounts/register', data);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue({
                    message: error.response.data[0]?.message || "Une erreur est survenue",
                    field: error.response.data[0]?.field
                });
            }
            return rejectWithValue({ message: "Une erreur est survenue" });
        }
    }
);

export const loginUser = createAsyncThunk<
    LoginResponse,
    { email: string; password: string },
    { rejectValue: ErrorResponse }>('auth/login', async (data, { rejectWithValue }) => {
        try {
            const response = await server().post<LoginResponse>('/auth/login', data);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue({
                    message: error.response.data[0]?.message || "Une erreur est survenue",
                    field: error.response.data[0]?.field
                });
            }
            return rejectWithValue({ message: "Une erreur est survenue" });
        }
    }
    );

export const getCurrentUser = createAsyncThunk<
    any,
    void,
    { rejectValue: ErrorResponse }>('auth/getCurrentUser', async (data, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await server({
                'Authorization': accessToken ? `Bearer ${accessToken}` : null,
                ["x-refresh"]: refreshToken ? refreshToken : null
            }).get("/auth/current");
            return response.data as User;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue({
                    message: error.response.data[0]?.message || "Une erreur est survenue",
                    field: error.response.data[0]?.field
                });
            }
            return rejectWithValue({ message: "Une erreur est survenue" });
        }
    }
    );
