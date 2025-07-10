// (drawer)/homeDrawer.tsx
import {StyleSheet, Text, View} from "react-native";

export default function HomeDrawer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home!</Text>
            <Text style={styles.title}>
                This is your main dashboard screen.
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
        // backgroundColor: "black",
    },
    title: {fontSize: 24, fontWeight: "bold", marginBottom: 12, color: "white"},
});
