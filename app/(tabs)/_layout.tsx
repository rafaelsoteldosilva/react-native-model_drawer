// app/(tabs)/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import {Tabs, useRouter} from "expo-router";
import {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";
import {useSession} from "../../contexts/ctx";

export default function ProtectedTabsLayout() {
    const {session, isLoading} = useSession();
    const router = useRouter();

    // Redirect to signIn if session is missing and not loading
    useEffect(() => {
        if (!isLoading && !session) {
            router.replace("/signInPage");
        }
    }, [isLoading, router, session]);

    // While checking session, show a loader
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // While redirecting, render nothing
    if (!session) {
        return null;
    }

    return (
        <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}>
            <Tabs.Screen
                name="homeTab"
                options={{
                    title: "Tabs Home", // You can change this title
                    headerTitleAlign: "center",
                    tabBarIcon: ({color}) => {
                        return (
                            <FontAwesome name="home" size={24} color={color} />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="otherTab"
                options={{
                    title: "Tabs Other", // You can change this title
                    headerTitleAlign: "center",
                    tabBarIcon: ({color}) => {
                        return (
                            <FontAwesome name="home" size={24} color={color} />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="signOut"
                options={{
                    title: "signOut", // You can change this title
                    headerTitleAlign: "center",
                    tabBarIcon: ({color}) => {
                        return (
                            <Octicons name="sign-out" size={24} color={color} />
                        );
                    },
                }}
            />
        </Tabs>
    );
}
