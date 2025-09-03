import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    const router = useRouter();
    const { homeData } = useLocalSearchParams();

    return (
        <View className="flex-1 px-8 py-2 gap-4 items-center">
            <Image style={{ width: 150, height: 100 }} source={require('../../assets/images/logo.png')} />
            <View className="flex flex-col items-center justify-center w-full p-4 gap-0 bg-white rounded">
                <Text className="font-bold text-sm mb-2">Próximo agendamento:</Text>
                <View className="flex flex-row items-center gap-2">
                    <FontAwesome name="history" size={24} />
                    <Text className="font-bold text-lg">28/08/2025 - 14:00</Text>
                </View>
                <Text className="text-sm">em <Text className="font-bold">Barbearia Corte Fino</Text></Text>
                <TouchableOpacity className="flex flex-row items-center gap-1 mt-1">
                    <Text className="text-red-600"><MaterialIcons name="cancel" size={14} /></Text>
                    <Text className="font-bold text-red-600 underline text-sm">Cancelar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push({pathname: '/(user)/schedule', params: {homeData}})} className="flex flex-row items-center justify-center gap-2 bg-blue-600 w-full p-2 rounded">
                <FontAwesome name="plus" size={24} color="white" />
                <Text className="font-bold text-white">Novo Agendamento</Text>
            </TouchableOpacity>
            <View className="flex flex-col items-center justify-center w-full p-4 gap-2 bg-white rounded">
                <Text className="font-bold text-sm">Barbearias próximas:</Text>
                <TouchableOpacity className="flex flex-row items-center justify-center gap-2">
                    <Text className="text-blue-600">
                        <FontAwesome5 name="map-marker-alt" size={24} />
                    </Text>
                    <Text className="font-bold text-lg text-blue-600 underline">ATIVAR LOCALIZAÇÃO</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center justify-center w-full p-4 gap-2 bg-white rounded">
                <Text className="font-bold text-sm">Barbearias próximas:</Text>
                <View className="flex flex-row items-center gap-4 w-full">
                    <Image source={require('../../assets/images/perfil.jpg')} className="rounded-full" style={{ width: 80, height: 80 }}></Image>
                    <View className="flex-1 text-wrap h-full">
                        <Text className="font-bold text-lg">Barbearia Corte Fino</Text>
                        <Text className="text-xs text-justify">Rua Mato Grosso, 1060, Apt. 14, Vila Mendonça, Araçatuba-SP</Text>
                        <TouchableOpacity className="flex flex-row items-center gap-1">
                            <Text className="text-blue-600"><FontAwesome name="plus" size={12} /></Text>
                            <Text className="font-bold underline text-blue-600 text-sm">Agendar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text className="font-bold underline text-blue-600 text-sm">VER TUDO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
