import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function ChangePassword() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        Alert.alert('Forgot Info', `Senha: ${data.password}`);
    };

    return (
        <View className="px-6 py-4 bg-white rounded-lg flex flex-col items-center gap-4 w-[90%] shadow">
                <Text className="uppercase font-black web:font-bold text-lg">Recuperar senha</Text>
                <View className="flex flex-col gap-2 w-full">
                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Nova Senha</Text>
                            {errors.password && <Text className="text-red-600 font-medium">{errors.password.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Senha obrigatória', minLength: { value: 6, message: 'Mínimo de 6 caracteres' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                placeholder="Digite sua nova senha"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                        />
                    </View>

                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Confirma Nova Senha</Text>
                            {errors.confirmPassword && <Text className="text-red-600 font-medium">{errors.confirmPassword.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{
                                required: 'Confirmação obrigatória',
                                validate: value => value === control._formValues.password || 'Senhas não coincidem',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                placeholder="Confirme sua nova senha"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                        />
                    </View>

                    <View className="mt-3 flex flex-col items-center gap-2">
                        <TouchableOpacity className="bg-[#1d69aa] p-2 rounded w-full flex flex-row justify-center items-center" onPress={handleSubmit(onSubmit)}>
                            <Text className="uppercase text-white font-medium">Alterar senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}