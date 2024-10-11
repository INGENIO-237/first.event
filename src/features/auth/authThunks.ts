import {createAsyncThunk} from '@reduxjs/toolkit';
import server from "@/lib/server";
import { LoginResponse } from '@/utils/types/auth';

interface RegisterData {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}
interface User {
    _v: number;
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    hasBeenDeleted: boolean;
    interests: unknown[];
    createdAt: Date;
    updatedAt: Date;
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
    async (data, {rejectWithValue}) => {
        try {
            const response = await server()
            .post<User>('/accounts/register', data);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue({
                    message: error.response.data[0]?.message || "Une erreur est survenue",
                    field: error.response.data[0]?.field
                });
            }
            return rejectWithValue({message: "Une erreur est survenue"});
        }
    }
);

export const loginUser = createAsyncThunk<
    LoginResponse,
    { email: string; password: string },
    { rejectValue: ErrorResponse }>('auth/login', async (data, {rejectWithValue}) => {
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
            return rejectWithValue({message: "Une erreur est survenue"});
        }
    }
);
