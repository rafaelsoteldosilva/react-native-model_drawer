// app/(tabs)/homeTab.tsx
import {Text, View} from "react-native";
export default function HomeTab() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>This is home tab screen</Text>
        </View>
    );
}
