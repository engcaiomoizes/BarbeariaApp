import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rotas públicas */}
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
      <Stack.Screen name="forgot-password" />

      {/* Rotas protegidas */}
      
    </Stack>
  );
}
