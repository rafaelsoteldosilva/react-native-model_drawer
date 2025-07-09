import {Ionicons} from "@expo/vector-icons";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import {Link, Redirect, router} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {ActivityIndicator, View} from "react-native";
import {useSession} from "../../contexts/signInContext";

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
    ] as const;

    function CustomDrawerContent(props: DrawerContentComponentProps) {
        const activeRoute = props.state.routeNames[props.state.index];

        return (
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    paddingTop: 70, // Increase this number to push the list down
                }}
            >
                {drawerScreens.map((screen) => {
                    const isActive = screen.name === activeRoute;

                    return (
                        <Link
                            key={screen.name}
                            href={`/(drawer)/${screen.name}`}
                            asChild
                        >
                            <DrawerItem
                                label={screen.label}
                                onPress={() =>
                                    router.push(`/(drawer)/${screen.name}`)
                                }
                                icon={({color, size}) => (
                                    <Ionicons
                                        name={screen.icon}
                                        size={size}
                                        color={isActive ? "green" : color}
                                        style={{
                                            marginRight: -4,
                                            marginLeft: -15,
                                        }}
                                    />
                                )}
                                labelStyle={{
                                    fontSize: 16,
                                    fontWeight: isActive ? "bold" : "500",
                                    marginLeft: -4,
                                    color: isActive ? "green" : "white",
                                }}
                                style={{
                                    marginHorizontal: 10,
                                    // marginVertical: 4,
                                    borderRadius: 12,
                                    backgroundColor: isActive
                                        ? "#e0ffe0"
                                        : "transparent",
                                }}
                                activeTintColor="green"
                                inactiveTintColor="#ccc"
                            />
                        </Link>
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
                drawerLabelStyle: {
                    fontSize: 16,
                },
                drawerStyle: {
                    backgroundColor: "#121A22", // your desired background color here
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        />
    );
}
