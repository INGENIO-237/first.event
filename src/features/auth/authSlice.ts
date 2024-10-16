import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser } from "./authThunks";
import { AuthState, LoginResponse, User } from "@/utils/types/auth";
import { status } from "@/store/status";
import { act } from "react";

const initialState: AuthState = {
    status: 'idle',// inactif

    error: null,
    accessToken: null,
    refreshToken: null,
    otpGenerated: false,
    currentUser: undefined,
    userFetched: false
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = status.IDLE;
            state.error = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.otpGenerated = false;
            state.currentUser = undefined;
            state.userFetched = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = status.LOADING;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = status.SUCCEEDED;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = status.FAILED;
                state.error = action.payload?.message || "Une erreur est survenue.";
            })
            .addCase(loginUser.pending, (state) => {
                state.status = status.LOADING;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                const { accessToken, refreshToken, otpGenerated } = action.payload;
                state.status = status.SUCCEEDED;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.otpGenerated = otpGenerated;
                if (otpGenerated) {
                    localStorage.setItem("loginInfo", JSON.stringify(action.payload));
                } else {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = status.FAILED;
                state.error = action.payload?.message || "Une erreur est survenue";
            })
            .addCase(getCurrentUser.pending, (state)=>{
                state.status = status.LOADING;
                state.error = null;
                state.userFetched = false;
            })
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = status.SUCCEEDED;
                state.error = null;
                state.userFetched = true;
                state.currentUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = status.FAILED;
                state.userFetched = false;
                state.error = action.payload?.message || "Une erreur est survenue"; 
                state.currentUser = undefined;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;