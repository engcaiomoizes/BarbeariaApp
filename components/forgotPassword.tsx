import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
    email: string;
};

interface Props {
    onSend: (email: string) => void;
};

export default function ForgotPasswordEmail({ onSend }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        Alert.alert('Forgot Info', `Email: ${data.email}`);
        onSend(data.email);
    };

    return (
        <View className="px-6 py-4 bg-white rounded-lg flex flex-col items-center gap-4 w-[90%] shadow">
            <Text className="uppercase font-black web:font-bold text-lg">Esqueci minha senha</Text>
            <View className="flex flex-col gap-2 w-full">
                <View className="flex flex-col gap-1">
                <View className="flex flex-row gap-2">
                        <Text className="font-semibold">E-mail</Text>
                        {errors.email && <Text className="text-red-600 font-medium">{errors.email.message}</Text>}
                    </View>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: 'E-mail obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' } }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                placeholder="Digite seu e-mail"
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View className="mt-3 flex flex-col items-center gap-2">
                    <TouchableOpacity className="bg-[#1d69aa] p-2 rounded w-full flex flex-row justify-center items-center" onPress={handleSubmit(onSubmit)}>
                        <Text className="uppercase text-white font-medium">Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}