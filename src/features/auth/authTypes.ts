export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

// Type pour l'état initial du slice auth
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
}

// Type pour l'utilisateur
export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}
