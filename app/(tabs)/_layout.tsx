import { useAuth } from "@/hooks/AuthContext";
import { barberData } from "@/services/barberData";
import { userData } from "@/services/userData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<any>(null);
  const [barber, setBarber] = useState<any>(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const handleLoad = async () => {
      setLoad(true);
      // Aguardar os dados do usuário antes de setar
      if (user) {
        const userDataResponse = await userData(user.uid);
        setData(userDataResponse);

        const barberDataResponse = await barberData();
        setBarber(barberDataResponse);
      }
      setLoad(false);
    };
    if (user) handleLoad();
    else setLoad(false);
  }, [user]);
  
  if (loading || load) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const profileParams = data ? {
    userData: JSON.stringify({
      id: data.uid,
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      createdAt: data.createdAt,
    }),
  } : {};

  const barberParams = barber ? {
    barberData: JSON.stringify({
      nome: barber.nome,
      endereco: barber.endereco,
      telefone: barber.telefone,
      horario: barber.horario,
    }),
  } : {};

  return (
    <SafeAreaView className="flex-1">
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
          headerShown: false,
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
          headerShown: false,
          headerTitle: "",
        }}
        initialParams={profileParams}
      />
      <Tabs.Screen
        name="my-barber"
        options={{
          title: "Minha Barbearia",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="shop" color={color} size={size} />
          ),
          headerShown: false,
          headerTitle: "",
        }}
        initialParams={barberParams}
      />
    </Tabs>
    </SafeAreaView>
  );
}