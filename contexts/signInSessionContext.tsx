// contexts/signInSessionContext.tsx
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {createContext, use, type PropsWithChildren} from "react";
import {Platform} from "react-native";
import {useStorageState} from "../hooks/useStorage";

const API_URL = "http://192.168.1.85:8000/api/v1/get_first_token/";

const AuthContext = createContext<{
    signIn: (email: string) => Promise<void>; // <-- now async
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => {}, // default async no-op
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
    return value;
}

export function SessionProvider({children}: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    const signIn = async (email: string): Promise<void> => {
        console.log("signing in...");
        setSession(email);

        const appName = process.env.EXPO_PUBLIC_APP_USER;
        const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

        if (!appName || !secretKey) {
            console.warn("Missing appName or secretKey in env.");
            return;
        }

        try {
            console.log("going to axios...");
            const response = await axios.patch(API_URL, {
                appName,
                secretKey,
            });
            console.log("coming from axios...");

            if (response.data.token) {
                const token = response.data.token;
                await SecureStore.setItemAsync("authToken", token);
                console.log("Token stored successfully");
            } else {
                await SecureStore.setItemAsync("authToken", "INVALID");
                console.warn("No token returned from API");
            }
        } catch (error) {
            console.error("Failed to retrieve token:", error);
        }
    };

    const signOut = async () => {
        setSession(null);
        if (Platform.OS === "web") {
            localStorage.removeItem("authToken");
        } else {
            await SecureStore.deleteItemAsync("authToken");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
