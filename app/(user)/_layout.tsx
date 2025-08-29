import { useAuth } from "@/hooks/AuthContext";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserLayout() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Redirect href="/(auth)/login" />;
    
    return <SafeAreaView className="flex-1"><Stack screenOptions={{ headerShown: false, headerTitle: "" }} /></SafeAreaView>;
}