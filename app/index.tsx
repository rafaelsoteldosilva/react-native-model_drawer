// app/index.tsx
import {Redirect} from "expo-router";
import {useSession} from "../contexts/ctx";

export default function Index() {
    const {session, isLoading} = useSession();

    if (isLoading) return null;

    return <Redirect href={session ? "/(tabs)/homeTab" : "/signInPage"} />;
}
