// (drawer)/profileDrawer.tsx
import {StyleSheet, Text, View} from "react-native";

export default function dummyDrawer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dummy Screen</Text>
            <Text>This is a dummy screen</Text>
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
