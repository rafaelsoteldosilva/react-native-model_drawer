// app/signInScreen.tsx
import {router} from "expo-router";
import {useState} from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {Button, Text, TextInput, useTheme} from "react-native-paper";
import {useSession} from "../contexts/signInSessionContext";

export default function SignInScreen() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>("");
    const {signIn} = useSession();
    const theme = useTheme();

    function handleSwitchMode() {
        setIsSignUp((prev) => !prev);
    }

    async function handleAuth() {
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (email !== "rafael.soteldo@gmail.com" || password !== "123456") {
            setError("Invalid email or password.");
            return;
        }

        setError(null);
        await signIn(email);
        router.replace("/");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{flex: 1}}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.title} variant="headlineMedium">
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </Text>
                    <TextInput
                        label="Email"
                        mode="outlined"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        label="Password"
                        mode="outlined"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                    {error ? (
                        <Text style={{color: theme.colors.error}}>{error}</Text>
                    ) : null}
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={handleAuth}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <Button
                        mode="text"
                        style={styles.switchMode}
                        onPress={handleSwitchMode}
                    >
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    content: {
        width: "100%",
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    switchMode: {
        marginTop: 10,
    },
});
