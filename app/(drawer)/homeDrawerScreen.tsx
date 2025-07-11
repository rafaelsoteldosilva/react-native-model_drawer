import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";

export default function HomeDrawerScreen() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function fetchToken() {
            try {
                if (Platform.OS === "web") {
                    const webToken = localStorage.getItem("authToken");
                    setToken(webToken);
                } else {
                    const nativeToken = await SecureStore.getItemAsync(
                        "authToken"
                    );
                    setToken(nativeToken);
                }
            } catch (error) {
                console.error("Failed to load auth token:", error);
            }
        }
        fetchToken();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home!</Text>
            <Text style={{textAlign: "center"}}>
                This is your main dashboard screen.
            </Text>
            <Text style={{textAlign: "center", marginTop: 10}}>
                Your auth token is: {token ?? "No token found"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {fontSize: 24, fontWeight: "bold", marginBottom: 12},
});
