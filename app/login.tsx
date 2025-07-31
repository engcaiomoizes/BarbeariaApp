import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

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
                <Text className="uppercase font-black web:font-bold text-lg">Fazer Login</Text>
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

                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Senha</Text>
                            {errors.password && <Text className="text-red-600 font-medium">{errors.password.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Senha obrigatória', minLength: { value: 6, message: 'Mínimo de 6 caracteres' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                placeholder="Digite sua senha"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                        />
                        <Text className="text-right text-blue-600 font-medium underline">Esqueci minha senha</Text>
                    </View>

                    <View className="mt-3 flex flex-col items-center gap-2">
                        <TouchableOpacity className="bg-[#1d69aa] p-2 rounded w-full flex flex-row justify-center items-center" onPress={handleSubmit(onSubmit)}>
                            <Text className="uppercase text-white font-medium">Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#eb4034] p-2 rounded w-full flex flex-row justify-center items-center gap-2">
                            <FontAwesome name="google" size={20} color="white" />
                            <Text className="uppercase text-white font-medium">Entrar com Google</Text>
                        </TouchableOpacity>
                        <Text className="uppercase font-medium underline mt-2" onPress={() => router.push('/cadastro')}>Criar conta</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
