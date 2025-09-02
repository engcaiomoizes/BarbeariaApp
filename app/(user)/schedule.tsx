import { getDayOfWeek, getDayText, getHorarios } from "@/lib/utils";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Check {
    [key: string]: boolean;
}

interface HomeData {
    userId: string;
    services: Service[];
    horario: string;
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

export default function Schedule() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { homeData } = params;
    const [data, setData] = useState<HomeData>();
    const [horarioList, setHorarioList] = useState<Record<string, Horario>>({});
    const [horarios, setHorarios] = useState<string[]>([]);

    const [isChecked, setIsChecked] = useState<Check>();

    useEffect(() => {
        if (homeData && JSON.stringify(data) !== JSON.stringify(JSON.parse(homeData as string))) {
            const parsedData = JSON.parse(homeData as string);
            console.log(parsedData);
            setData(parsedData);

            const initialCheckedState: Check = parsedData.services.reduce((acc: Check, service: Service) => {
                acc[service.key] = false;
                return acc;
            }, {});

            const horarioString = atob(parsedData.horario);
            setHorarioList(JSON.parse(horarioString));
        }
    }, [params, data, homeData]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [showPicker, setShowPicker] = useState(false);

    const [observacoes, setObservacoes] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (item: string) => {
        setIsChecked((prevChecked) => ({
            ...prevChecked,
            [item]: !(prevChecked?.[item] ?? false),
        }));
    };

    const handleChangeDate = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (event.type === "dismissed") {
            setShowPicker(false);
            return;
        }

        if (date) setSelectedDate(date);
    };

    useEffect(() => {
        setShowPicker(false);
        setDayOfWeek(getDayOfWeek(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        if (data) {
            const listaHorarios = getHorarios(horarioList[getDayText(dayOfWeek)].start, horarioList[getDayText(dayOfWeek)].end, 30);
            setHorarios(listaHorarios);
            setSelectedTime(listaHorarios[0]);
        }
    }, [horarioList, data]);

    const handleSubmit = async () => {
        if (!data || selectedTime === "") return;
        console.log("User: ", data.userId);
        console.log("Date: ", selectedDate.toLocaleDateString());
        console.log("Time: ", selectedTime);
        console.log("Observações: ", observacoes);
        // try {
        //     setLoading(true);
        //     await createAgendamento(
        //         data.userId,
        //         'barber',
        //         selectedDate.toLocaleDateString(),
        //         selectedTime.toString(),
        //         observacoes,
        //     );
        //     router.replace('/reload');
        //     setTimeout(() => {
        //         router.replace('/(tabs)/home');
        //     }, 10);
        // } catch (err) {
        //     console.error(err);
        // } finally {
        //     setLoading(false);
        // }
    };

    if (!data) return <Text>Carregando...</Text>;
    
    return (
        <View className="flex-1 p-8">
            <View className="flex flex-col gap-4">
                <View className="flex flex-col gap-1">
                    <TouchableOpacity onPress={() => setShowPicker(true)} className="flex flex-col items-center justify-center bg-blue-600 p-2 rounded h-16">
                        <Text className="text-green-500 font-black">{selectedDate.toLocaleDateString()}</Text>
                        <Text className="text-white font-black">Selecione a data</Text>
                    </TouchableOpacity>
                    {
                        showPicker &&
                        <DateTimePicker mode="date" value={selectedDate} onChange={handleChangeDate} />
                    }
                </View>
                <View className="flex flex-col gap-1">
                    <Text>Horários disponíveis:</Text>
                    <Picker selectedValue={selectedTime} onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}>
                        {
                            horarios.map((sched) => (
                                <Picker.Item key={sched} label={sched} value={sched} />
                            ))
                        }
                    </Picker>
                </View>
                <View className="flex flex-col gap-2">
                    <Text>Serviços:</Text>
                    {
                        data?.services.map((service, index) => (
                            <View key={index} className="flex flex-row items-center gap-2">
                                <Checkbox value={isChecked?.[service.key]} onValueChange={() => handleChange(service.key)} />
                                <Text onPress={() => handleChange(service.key)}>{service.title}</Text>
                            </View>
                        ))
                    }
                </View>
                <View className="flex flex-col gap-1">
                    <Text>Observações:</Text>
                    <TextInput
                        style={{
                            backgroundColor: '#f3f4f6',
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                        }}
                        value={observacoes}
                        onChangeText={(e) => setObservacoes(e)}
                    />
                </View>
                <View className="flex flex-row gap-2">
                    <TouchableOpacity onPress={handleSubmit} className="flex-1 flex-row items-center justify-center bg-blue-600 border border-blue-600 p-2 rounded">
                        <Text className="text-white font-black">Agendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} className="flex-1 flex-row items-center justify-center bg-transparent border border-red-600 p-2 rounded">
                        <Text className="text-red-600 font-black">Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}