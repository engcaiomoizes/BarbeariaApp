import { barberUpdate } from "@/services/barberUpdate";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

interface Props {
    data: BarberData;
    onClose: () => void;
}

interface BarberData {
    nome: string;
    endereco: string;
    telefone: string;
}

interface FormData {
    nome: string;
    endereco: string;
    telefone: string;
}

export default function EditDataForm({ data, onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await barberUpdate(
                data.nome,
                data.endereco,
                data.telefone,
            );
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
                    <View className="flex flex-col gap-1">
                        <Text>Nome:</Text>
                        <Controller
                            control={control}
                            name="nome"
                            rules={{
                                required: 'Nome obrigatório',
                            }}
                            defaultValue={data.nome}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Digite o nome da Barbearia"
                                    keyboardType="default"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#f3f4f6',
                                    }}
                                />
                            )}
                        />
                    </View>
                    <View className="flex flex-col gap-1">
                        <Text>Endereço:</Text>
                        <Controller
                            control={control}
                            name="endereco"
                            rules={{
                                required: 'Endereço obrigatório',
                            }}
                            defaultValue={data.endereco}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Digite o endereço da Barbearia"
                                    keyboardType="default"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#f3f4f6',
                                    }}
                                />
                            )}
                        />
                    </View>
                    <View className="flex flex-col gap-1">
                        <Text>Telefone:</Text>
                        <Controller
                            control={control}
                            name="telefone"
                            rules={{
                                required: 'Telefone obrigatório',
                                pattern: {
                                    value: /^\(\d{2}\)\s\d{5}-\d{4}$/,
                                    message: 'Formato de telefone inválido',
                                },
                            }}
                            defaultValue={data.telefone}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInputMask
                                    placeholder="Digite o telefone da Barbearia"
                                    keyboardType="phone-pad"
                                    type="custom"
                                    options={{ mask: '(99) 99999-9999' }}
                                    maxLength={15}
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#f3f4f6'
                                    }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                    <View className="flex flex-row items-center gap-2 mt-4">
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={loading} className="flex-1 flex-row justify-center items-center bg-blue-600 border border-blue-600 p-2 rounded">
                            <Text className="text-white font-black">{ loading ? 'Carregando...' : 'Salvar' }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} className="flex-1 flex-row justify-center items-center bg-white border border-red-600 p-2 rounded">
                            <Text className="text-red-600 font-black">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}