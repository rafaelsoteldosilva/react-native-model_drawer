// app/(drawer)/_layout.tsx
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {useNavigation} from "@react-navigation/native";
import {Redirect} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {ActivityIndicator, Pressable, View} from "react-native";
import {useSession} from "../../contexts/ctx";

import {Ionicons} from "@expo/vector-icons";

type DrawerParamList = {
    home: undefined;
    profile: undefined;
};

export default function DrawerLayout() {
    const {session, isLoading} = useSession();
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (!session) {
        return <Redirect href="/signInPage" />;
    }

    return (
        <Drawer
            screenOptions={{
                headerLeft: () => (
                    <Pressable
                        onPress={() => navigation.toggleDrawer()}
                        style={{marginLeft: 15}}
                    >
                        <Ionicons name="menu" size={24} />
                    </Pressable>
                ),
            }}
        >
            <Drawer.Screen name="home" options={{title: "Home"}} />
            <Drawer.Screen name="profile" options={{title: "Profile"}} />
        </Drawer>
    );
}
