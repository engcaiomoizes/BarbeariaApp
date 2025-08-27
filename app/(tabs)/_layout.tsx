import { useAuth } from "@/hooks/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  
  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#007bff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Tabs.Screen
        name="my-barber"
        options={{
          title: "Minha Barbearia",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="shop" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Tabs>
  );
}