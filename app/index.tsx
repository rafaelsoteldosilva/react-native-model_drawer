// app/index.tsx
import {Redirect} from "expo-router";
import "react-native-gesture-handler";
import {useSession} from "../contexts/signInSessionContext";

export default function Index() {
    const {session, isLoading} = useSession();

    if (isLoading) return null;

    return (
        <Redirect
            href={session ? "/(drawer)/homeDrawerScreen" : "/signInScreen"}
        />
    );
}
