// app/_layout.tsx
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SessionProvider} from "../contexts/signInContext";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SessionProvider>
                <StatusBar style="auto" />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {backgroundColor: "black"},
                    }}
                />
            </SessionProvider>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
});
