import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Redirect} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {ActivityIndicator, Image, View} from "react-native";
import {useSession} from "../../contexts/signInContext";
import {DrawerLinkItem} from "./DrawerLinkItem";

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
        return <Redirect href="/signInPage" />;
    }

    const drawerScreens = [
        {name: "homeDrawer", label: "Home", icon: "home"},
        {name: "profileDrawer", label: "Profile", icon: "person"},
        {name: "signOut", label: "Sign Out", icon: "log-out"},
        {name: "dummy", label: "dummy", icon: "log-out"},
    ] as const;

    function CustomDrawerContent(props: DrawerContentComponentProps) {
        const activeRoute = props.state.routeNames[props.state.index];

        return (
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    paddingTop: 1, // Increase this number to push the list down
                }}
            >
                <View style={{padding: 16, alignItems: "center"}}>
                    <Image
                        source={require("@/assets/images/react-logo.png")}
                        style={{width: 80, height: 80, borderRadius: 40}}
                    />
                </View>
                {drawerScreens.map((screen) => {
                    const isActive = screen.name === activeRoute;
                    if (screen.name !== "dummy") {
                        return (
                            <DrawerLinkItem
                                key={screen.name}
                                name={screen.name}
                                label={screen.label}
                                icon={screen.icon}
                                isActive={isActive}
                            />
                        );
                    }
                    return null;
                })}
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: "green",
                drawerInactiveTintColor: "#666",
                drawerLabelStyle: {
                    fontSize: 16,
                },
                // drawerStyle: {
                //     backgroundColor: "#121A22", // your desired background color here
                // },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        />
    );
}
