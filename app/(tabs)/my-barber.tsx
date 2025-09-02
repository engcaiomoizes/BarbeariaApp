import EditDataForm from "@/components/editDataForm";
import EditOpeningForm from "@/components/editOpeningForm";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface BarberData {
    nome: string;
    endereco: string;
    telefone: string;
    horario: string;
    services: Service[];
}

interface Service {
    key: string;
    title: string;
    price: number;
}

interface Horario {
    start: string;
    end: string;
}

export default function MyBarber() {
    const params = useLocalSearchParams();
    const { barberData } = params;
    const [data, setData] = useState<BarberData>();
    const [loading, setLoading] = useState(false);
    const [editando, setEditando] = useState(false);
    const [horarios, setHorarios] = useState(false);
    const [horarioList, setHorarioList] = useState<Record<string, Horario>>({});

    useEffect(() => {
        if (barberData && JSON.stringify(data) !== JSON.stringify(JSON.parse(barberData as string))) {
            const parsedData = JSON.parse(barberData as string);
            console.log(parsedData);
            setData(parsedData);

            const horarioString = atob(parsedData.horario);
            setHorarioList(JSON.parse(horarioString));
        }
    }, [params, data, barberData]);

    if (!data) {
        return <Text>Carregando...</Text>;
    }

    const capitalizeFirstLetter = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // if (editando) return <EditDataForm data={data} />

    return (
        <ScrollView className="" style={{ flexGrow: 1 }}>
            {
                editando &&
                <EditDataForm data={data} onClose={() => setEditando(false)} />
            }
            {
                horarios &&
                <EditOpeningForm horario={data.horario} onClose={() => setHorarios(false)} />
            }
            <View className="flex flex-col gap-4 p-8">
                <View className="flex flex-row items-center gap-4 p-2 rounded bg-transparent">
                    <Image source={require('../../assets/images/perfil.jpg')} className="rounded-full" style={{ width: 100, height: 100 }}></Image>
                    <View className="flex-1 text-wrap">
                        <Text className="text-2xl font-bold">{data?.nome}</Text>
                    </View>
                </View>
                <View className="flex flex-row items-center justify-center gap-2 text-base px-6">
                    <FontAwesome5 name="map-marker-alt" size={24} />
                    <Text className="text-justify text-base">{data?.endereco}</Text>
                </View>
                <View className="flex flex-row items-center justify-center gap-2 text-base">
                    <FontAwesome name="phone-square" size={24} />
                    <Text className="text-justify text-base">{data?.telefone}</Text>
                </View>
                <TouchableOpacity onPress={() => setEditando(true)} className="flex items-center justify-center bg-blue-600 p-2 rounded">
                    <Text className="text-white font-black">{loading ? 'Carregando...' : 'Editar Dados'}</Text>
                </TouchableOpacity>
                <View className="flex flex-col gap-2 p-2 rounded bg-white">
                    <View className="flex flex-row items-center justify-center gap-2">
                        <FontAwesome5 name="clock" size={18} />
                        <Text className="text-justify font-black">Horário de funcionamento:</Text>
                    </View>
                    <View className="flex flex-col gap-1 px-6">
                        {
                            Object.keys(horarioList).map((day) => (
                                <View key={day} className="flex flex-row justify-between">
                                    <Text className="w-12">{capitalizeFirstLetter(day)}.</Text>
                                    <Text>----</Text>
                                    <Text className="w-32" style={{ textAlign: 'right' }}>{horarioList[day].start && horarioList[day].end ? horarioList[day].start + ' às ' + horarioList[day].end : 'Fechado'}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={() => setHorarios(true)} className="flex items-center justify-center bg-blue-600 p-2 rounded">
                    <Text className="text-white font-black">Alterar Horário de Funcionamento</Text>
                </TouchableOpacity>
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
                <TouchableOpacity className="flex flex-row items-center justify-center bg-blue-600 p-2 rounded gap-2">
                    <FontAwesome name="gear" size={18} style={{ color: 'white' }} />
                    <Text className="text-white font-black">Serviços</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}