import { Controller, useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa";
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
                <Text className="uppercase font-bold text-lg">Fazer Login</Text>
                <View className="flex flex-col gap-2 w-full">
                    <View className="flex flex-col gap-1">
                        <Text className="font-medium">E-mail</Text>
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
                        {errors.email && <Text className="text-red-600 font-medium">{errors.email.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-1">
                        <Text className="font-medium">Senha</Text>
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
                        <Text className="text-end text-blue-600 font-medium underline">Esqueci minha senha</Text>
                        {errors.password && <Text className="text-red-600 font-medium">{errors.password.message}</Text>}
                    </View>

                    <View className="mt-3 flex flex-col items-center gap-2">
                        <TouchableOpacity className="bg-[#1d69aa] p-2 rounded w-full" onPress={handleSubmit(onSubmit)}>
                            <Text className="uppercase text-white font-medium flex justify-center items-center">Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#eb4034] p-2 rounded w-full">
                            <Text className="uppercase text-white font-medium flex justify-center items-center gap-2"><FaGoogle className="size-5" />Entrar com Google</Text>
                        </TouchableOpacity>
                        <Text className="uppercase font-medium underline mt-2">Criar conta</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
