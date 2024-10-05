import axios from "axios";

const ax = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const login = async (data: any) => {
    const response = await ax.post("/auth/login", data);
    return response.data;
}

const getCurrentUser = async () => {
    const response = await ax.get("/auth/current");
    return response.data;
}


export const AuthService = {
    login,
    getCurrentUser,
}