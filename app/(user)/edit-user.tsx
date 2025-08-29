import { useAuth } from "@/hooks/AuthContext";
import { updateUser } from "@/services/updateUser";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

interface FormData {
    nome: string;
    telefone: string;
}

export default function EditPhone() {
    const { user, loading } = useAuth();
    const { nome, phone, id } = useLocalSearchParams();
    const [load, setLoad] = useState(false);
    const router = useRouter();

    if (loading) return null;

    if (!user) return <Redirect href="/(auth)/login" />;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        try {
            setLoad(true);
            await updateUser(id.toString(), data.nome, data.telefone);
            router.replace('/reload');
            setTimeout(() => {
                router.replace('/(tabs)/profile');
            }, 10);
        } catch (err) {
            console.error(err);
        } finally {
            setLoad(false);
        }
    };

    return (
        <View className="flex-1 p-8 bg-white">
            <View className="flex flex-col gap-4">
                <View className="flex flex-col gap-1">
                    <Text>Nome:</Text>
                        <Controller
                            control={control}
                            name="nome"
                            rules={{
                                required: 'Nome obrigatório',
                            }}
                            defaultValue={nome.toString()}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Digite o seu nome"
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
                        defaultValue={phone.toString()}
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
                <View className="flex flex-row items-center gap-2">
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={load} className="flex-1 flex-row justify-center items-center bg-blue-600 border border-blue-600 p-2 rounded">
                        <Text className="text-white font-bold">{ load ? 'Carregando...' : 'Salvar' }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} className="flex-1 flex-row justify-center items-center bg-white border border-red-600 p-2 rounded">
                        <Text className="text-red-600 font-bold">Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}