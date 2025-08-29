import { openingUpdate } from "@/services/openingUpdate";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    horario: string;
    onClose: () => void;
}

interface FormData {
    dom: DayTime;
    seg: DayTime;
    ter: DayTime;
    qua: DayTime;
    qui: DayTime;
    sex: DayTime;
    sab: DayTime;
}

interface DayTime {
    start: string;
    end: string;
}

export default function EditOpeningForm({ horario, onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        //
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const timeStringToDate = (time: string): Date => {
        const [hour, minute] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(0);
        return date;
    };

    const horarioString = atob(horario);
    const [horarios, setHorarios] = useState(JSON.parse(horarioString));

    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [timeType, setTimeType] = useState<'start' | 'end' | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isEndTime, setIsEndTime] = useState(false);
    const [pickerTitle, setPickerTitle] = useState("");

    const handleEditTime = (day: string, type: 'start' | 'end') => {
        setSelectedDay(day);
        setTimeType(type);
        const currentTime = horarios[day][type];
        const [hours, minutes] = currentTime ? currentTime.split(':') : ['00', '00'];
        setCurrentTime(new Date(2025, 0, 1, parseInt(hours), parseInt(minutes)));
        setPickerTitle("Data Inicial");
        setShowPicker(true);
        setIsEndTime(false);
    };

    const handleTimeChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (event.type === "dismissed") {
            setShowPicker(false);
            return;
        }
        
        const currentDate = selectedDate || currentTime;
        setShowPicker(false);

        if (selectedDay && timeType) {
            const updatedHorarios = { ...horarios };
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            updatedHorarios[selectedDay][timeType] = `${hours}:${minutes}`;
            setHorarios(updatedHorarios);

            // Se o horário de início foi alterado, mostramos o picker para o fim
            if (timeType === 'start' && !isEndTime) {
                setIsEndTime(true);
                setTimeType('end');
                setCurrentTime(new Date(2025, 0, 1, parseInt(hours), parseInt(minutes)));
                setPickerTitle("Data Final");
                setShowPicker(true);
            }
        }
    };

    const handleCloseTime = (day: string) => {
        const updatedHorarios = { ...horarios };
        updatedHorarios[day]['start'] = null;
        updatedHorarios[day]['end'] = null;
        setHorarios(updatedHorarios);
    };

    const formatStringTime = (time: string | null) => {
        if (!time) return "00:00";
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const capitalizeFirstLetter = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const base64Str = btoa(JSON.stringify(horarios));
            await openingUpdate(base64Str);
            onClose();
            router.replace('/reload');
            setTimeout(() => {
                router.replace('/(tabs)/my-barber');
            }, 10);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="absolute w-full h-full z-20">
            <View onTouchEnd={onClose} className="absolute w-full h-full bg-black/50"></View>
            <View className="p-8">
                <View className="flex flex-col bg-white p-6 gap-4 rounded">
                    {
                        Object.keys(horarios).map((day) => (
                            <View key={day} className="flex flex-row justify-between items-center">
                                <Text className="w-12">{capitalizeFirstLetter(day)}.</Text>
                                <View className="flex flex-col items-center gap-1">
                                    <TouchableOpacity onPress={() => handleEditTime(day, 'start')} className="flex flex-row items-center justify-center bg-blue-600 p-2 rounded">
                                        <Text className="text-white font-medium">Alterar</Text>
                                    </TouchableOpacity>
                                    <Text onPress={() => handleCloseTime(day)} className="text-sm underline text-red-600 font-bold">Fechar</Text>
                                </View>
                                <Text className="w-32" style={{ textAlign: 'right' }}>{horarios[day].start && horarios[day].end ? horarios[day].start + ' às ' + horarios[day].end : 'Fechado'}</Text>
                            </View>
                        ))
                    }
                    <View className="flex flex-row items-center gap-2">
                        <TouchableOpacity onPress={handleSave} className="flex-1 flex-row items-center justify-center bg-blue-600 border border-blue-600 p-2 rounded">
                            <Text className="text-white font-black">{ loading ? 'Carregando...' : 'Salvar' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} className="flex-1 flex-row items-center justify-center bg-white p-2 border border-red-600 rounded">
                            <Text className="text-red-600 font-black">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        showPicker &&
                        <DateTimePicker mode="time" value={currentTime} is24Hour={true} design="material" title={pickerTitle} onChange={handleTimeChange} />
                    }
                </View>
            </View>
        </View>
    );
}