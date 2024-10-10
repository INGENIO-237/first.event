import {createAsyncThunk} from '@reduxjs/toolkit';
import ax from "@/lib/server";

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
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await ax({
                'Authorization': accessToken ? `Bearer ${accessToken}` : null,
                ["x-refresh"]: refreshToken ? refreshToken : null
            }).post<User>('/accounts/register', data);
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