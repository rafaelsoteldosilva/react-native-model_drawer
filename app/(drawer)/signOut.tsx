// app/(drawer)/signOut.tsx

import {useEffect} from "react";
import {Text, View} from "react-native";
import {useSession} from "../../contexts/signInContext";

export default function SignOut() {
    const {signOut} = useSession();

    useEffect(() => {
        // Run once on mount
        signOut(); // Clears session
    }, [signOut]);

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Signing out...</Text>
        </View>
    );
}
