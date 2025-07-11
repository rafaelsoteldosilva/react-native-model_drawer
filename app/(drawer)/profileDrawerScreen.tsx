// (drawer)/profileDrawerScreen.tsx
import {StyleSheet, Text, View} from "react-native";

export default function ProfileDrawerScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={{textAlign: "center"}}>
                This is the profile screen where you can see your info.
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
