import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image, Text, View } from "react-native";

export default function MyBarber() {
    return (
        <View className="flex-1 p-8 gap-4">
            <View className="flex flex-row items-center gap-4 p-2 rounded bg-transparent">
                <Image source={require('../../assets/images/perfil.jpg')} className="rounded-full" style={{ width: 100, height: 100 }}></Image>
                <View className="flex-1 text-wrap">
                    <Text className="text-2xl font-bold">Barbearia Corte Fino</Text>
                </View>
            </View>
            <View className="flex flex-row items-center justify-center gap-2 text-base px-6">
                <FontAwesome5 name="map-marker-alt" size={24} />
                <Text className="text-justify text-base">Rua Mato Grosso, 1060, Apt. 14, Vila Mendonça, Araçatuba-SP</Text>
            </View>
            <View className="flex flex-row items-center justify-center gap-2 text-base">
                <FontAwesome name="phone-square" size={24} />
                <Text className="text-justify text-base">(18) 98819-6113</Text>
            </View>
            <View className="flex flex-col gap-2 p-2 rounded bg-white">
                <View className="flex flex-row items-center justify-center gap-2">
                    <FontAwesome5 name="clock" size={18} />
                    <Text className="text-justify font-black">Horário de funcionamento:</Text>
                </View>
                <View className="flex flex-col gap-1 px-6">
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Dom.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>Fechado</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Seg.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>09h às 17h</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Ter.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>08h às 17h</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Qua.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>08h às 17h</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Qui.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>08h às 17h</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Sex.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>08h às 16h</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="w-12">Sáb.</Text>
                        <Text>----</Text>
                        <Text className="w-24" style={{ textAlign: 'right' }}>08h às 12h</Text>
                    </View>
                </View>
            </View>
            <View className="flex flex-col gap-2 p-2 rounded bg-white">
                <View className="flex flex-row items-center justify-center gap-2">
                    <FontAwesome name="history" size={18} />
                    <Text className="text-justify font-black">Agendamentos do dia:</Text>
                </View>
                <View className="flex flex-col gap-1 px-2">
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-col">
                            <Text className="font-bold">Caio Moizés Santos</Text>
                            <Text className="text-sm">(18) 98819-6113</Text>
                        </View>
                        <Text className="font-bold">14h</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-col">
                            <Text className="font-bold">Caio Moizés Santos</Text>
                            <Text className="text-sm">(18) 98819-6113</Text>
                        </View>
                        <Text className="font-bold">16h</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-col">
                            <Text className="font-bold">Caio Moizés Santos</Text>
                            <Text className="text-sm">(18) 98819-6113</Text>
                        </View>
                        <Text className="font-bold">16h30</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}