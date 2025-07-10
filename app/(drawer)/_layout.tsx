import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Redirect} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {ActivityIndicator, View} from "react-native";

import {useSession} from "../../contexts/signInSessionContext";
import {DrawerEachItem} from "../../genericComponents/DrawerEachItem";

export default function DrawerLayout() {
    const {session, isLoading} = useSession();

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
        return <Redirect href="/signInScreen" />;
    }

    const drawerScreens = [
        {
            name: "homeDrawerScreen",
            label: "Home",
            icon: {library: FontAwesome, name: "home"},
        },
        {
            name: "profileDrawerScreen",
            label: "Profile",
            icon: {library: MaterialIcons, name: "person-outline"},
        },
        {
            name: "signOut",
            label: "Sign Out",
            icon: {library: Ionicons, name: "log-out-outline"},
        },
    ] as const;

    function CustomDrawerContent(props: DrawerContentComponentProps) {
        const activeRoute = props.state.routeNames[props.state.index];

        return (
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        padding: 16,
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <Ionicons name="apps" size={25} color="green" />
                </View>

                {drawerScreens.map((screen) => {
                    const isActive = screen.name === activeRoute;
                    return (
                        <DrawerEachItem
                            key={screen.name}
                            name={screen.name}
                            label={screen.label}
                            icon={screen.icon}
                            isActive={isActive}
                        />
                    );
                })}
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: "green",
                drawerInactiveTintColor: "#666",
                drawerLabelStyle: {fontSize: 16},
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        />
    );
}
