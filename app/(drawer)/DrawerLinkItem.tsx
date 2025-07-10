// DrawerLinkItem.tsx
import {DrawerItem} from "@react-navigation/drawer";
import {router} from "expo-router";
import {useSession} from "../../contexts/signInContext";

type DrawerLinkItemProps = {
    name: string;
    label: string;
    icon: {
        library: React.ComponentType<any>; // <- relaxed typing
        name: string;
    };
    isActive: boolean;
};

export function DrawerLinkItem({
    name,
    label,
    icon,
    isActive,
}: DrawerLinkItemProps) {
    const {signOut} = useSession();
    const IconLibrary = icon.library;

    const handlePress = () => {
        if (name === "signOut") {
            signOut();
            router.replace("/signInPage");
        } else {
            router.push(`/(drawer)/${name}` as any);
        }
    };

    return (
        <DrawerItem
            label={label}
            onPress={handlePress}
            icon={({color, size}) => (
                <IconLibrary
                    name={icon.name}
                    size={size}
                    color={isActive ? "green" : color}
                    style={{marginRight: -4, marginLeft: -15}}
                />
            )}
            labelStyle={{
                fontSize: 16,
                fontWeight: isActive ? "bold" : "500",
                marginLeft: -4,
                color: isActive ? "green" : "#9AA2AB",
            }}
            style={{
                marginHorizontal: 10,
                borderRadius: 12,
                backgroundColor: isActive ? "#e0ffe0" : "transparent",
            }}
        />
    );
}
