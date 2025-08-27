import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    return (
        <View className="flex-1 p-8 gap-4">
            <View className="flex flex-row items-center gap-4 p-2 rounded bg-transparent">
                <Image source={require('../../assets/images/perfil.jpg')} className="rounded-full" style={{ width: 100, height: 100 }}></Image>
                <View className="flex-1 text-wrap">
                    <Text className="text-2xl font-bold">Caio Moizés Santos</Text>
                </View>
            </View>
            <View className="flex flex-row items-center justify-between p-2 rounded bg-white">
                <View className="flex flex-row items-center gap-2">
                    <FontAwesome name="phone" size={24} />
                    <Text className="font-bold">(18) 98819-6113</Text>
                </View>
                <FontAwesome5 name="edit" size={18} onPress={() => alert("Editar Telefone")} />
            </View>
            <View className="flex flex-row items-center justify-between p-2 rounded bg-white">
                <View className="flex flex-row items-center gap-2">
                    <Entypo name="mail" size={24} />
                    <Text className="font-bold">caiomoizes@hotmail.com</Text>
                </View>
                <FontAwesome5 name="edit" size={18} onPress={() => alert("Editar E-mail")} />
            </View>
            <TouchableOpacity className="flex flex-row items-center justify-center p-2 rounded bg-gray-600 gap-2">
                <FontAwesome name="history" size={24} color="white" />
                <Text className="font-black text-white">Ver Histórico de Agendamentos</Text>
            </TouchableOpacity>
            <View className="flex flex-col gap-4 mt-4">
                <TouchableOpacity className="flex flex-row rounded p-2 justify-center bg-blue-600">
                    <Text className="text-white font-black">Alterar Senha</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row rounded p-2 justify-center bg-red-600">
                    <Text className="text-white font-black">Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}