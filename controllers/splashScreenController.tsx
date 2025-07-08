// controllers/splashScreenController.tsx
import {SplashScreen} from "expo-router";
import {useSession} from "../contexts/ctx";

export function SplashScreenController() {
    const {isLoading} = useSession();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}
