import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import '../global.css';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [user, loading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
