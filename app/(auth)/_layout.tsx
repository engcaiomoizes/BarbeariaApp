import { useAuth } from "@/hooks/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (user) return <Redirect href="/(tabs)/home" />;
    
    return <Stack screenOptions={{ headerShown: false }} />;
}