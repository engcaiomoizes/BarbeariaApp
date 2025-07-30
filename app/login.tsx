import { Controller, useForm } from 'react-hook-form';
import { Alert, Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = (data: FormData) => {
        Alert.alert('Login Info', `Email: ${data.email}\nSenha: ${data.password}`);
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Image style={{ width: 300, height: 200 }} source={require('../assets/images/logo.png')} />
            <View className="px-6 py-4 bg-white rounded-lg flex flex-col items-center gap-4 w-[90%] shadow">
                <Text className="uppercase font-bold text-lg">Fazer Login</Text>
                <View className="flex flex-col gap-2 w-full">
                    <View className="flex flex-col gap-1">
                        <Text>E-mail</Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'E-mail obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.email && <Text className="text-red-600 font-medium">{errors.email.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-1 mb-3">
                        <Text>Senha</Text>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Senha obrigatória', minLength: { value: 6, message: 'Mínimo de 6 caracteres' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                placeholder="Senha"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                        />
                        {errors.password && <Text className="text-red-600 font-medium">{errors.password.message}</Text>}
                    </View>

                    <Button color="#1d69aa" title="Entrar" onPress={handleSubmit(onSubmit)} />
                    <TouchableOpacity className="bg-gray-100 p-4 border rounded">
                        <Text className="text-red-600 bg-green-600">Entrar com Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
