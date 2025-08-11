import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  const { user, loading } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {
        user ? (
          <>
            {/* Rotas protegidas */}
            <Stack.Screen name="home" />
          </>
        ) : (
          <>
            {/* Rotas públicas */}
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="forgot-password" />
          </>
        )
      }
    </Stack>
  );
}
