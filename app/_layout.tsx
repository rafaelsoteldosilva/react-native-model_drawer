// app/_layout.tsx
import {Stack} from "expo-router";
import {SessionProvider} from "../contexts/ctx";

export default function RootLayout() {
    return (
        <SessionProvider>
            <Stack screenOptions={{headerShown: false}} />
        </SessionProvider>
    );
}
