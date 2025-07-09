// controllers/splashScreenController.tsx
import {SplashScreen} from "expo-router";
import {useSession} from "../contexts/signInContext";

export function SplashScreenController() {
    const {isLoading} = useSession();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}
