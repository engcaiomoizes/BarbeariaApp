import { registerUser } from '@/services/registerUser';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import tw from "tailwind-react-native-classnames";

type FormData = {
    nome: string;
    telefone: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
};

export default function Cadastro() {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await registerUser(data.email, data.password, data.nome, data.telefone);
            router.replace('/');
        } catch (err) {
            Alert.alert("Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const [inputMaskSelected, setInputMaskSelected] = useState(false);

    return (
        <View className="flex pt-10 justify-center items-center">
            <Image style={{ width: 300, height: 200 }} source={require('../assets/images/logo.png')} />
            <View className="px-6 py-4 bg-white rounded-lg flex flex-col items-center gap-4 w-[90%] shadow">
                <Text className="uppercase font-black web:font-bold text-lg">Cadastre-se</Text>
                <View className="flex flex-col gap-2 w-full">

                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Nome completo</Text>
                            {errors.nome && <Text className="text-red-600 font-medium">{errors.nome.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="nome"
                            rules={{ required: 'Nome obrigatório', pattern: { value: /^[A-Za-zÀ-ÿ\s]+$/, message: 'Inválido. Use apenas letras.' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                    placeholder="Digite seu nome"
                                    keyboardType="default"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>

                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Telefone</Text>
                            {errors.telefone && <Text className="text-red-600 font-medium">{errors.telefone.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="telefone"
                            rules={{ required: 'Telefone obrigatório', pattern: { value: /^\(\d{2}\)\s\d{5}-\d{4}$/, message: 'Formato de telefone inválido' } }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInputMask
                                    type="custom"
                                    options={{
                                        mask: "(99) 99999-9999",
                                    }}
                                    maxLength={15}
                                    style={tw`bg-gray-100 px-4 py-3 rounded outline-none border ${inputMaskSelected ? 'outline-none border-[1d69aa]' : 'border-gray-100'} transition ease-in-out duration-150`}
                                    selectionColor="#1d69aa"
                                    onFocus={() => setInputMaskSelected(true)}
                                    placeholder="Digite seu telefone"
                                    keyboardType="phone-pad"
                                    onBlur={() => {
                                        onBlur();
                                        setInputMaskSelected(false);
                                    }}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>

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
                            <Text className="font-semibold">Confirma E-mail</Text>
                            {errors.confirmEmail && <Text className="text-red-600 font-medium">{errors.confirmEmail.message}</Text>}
                        </View>
                        <Controller
                            control={control}
                            name="confirmEmail"
                            rules={{
                                required: 'Confirmação obrigatória',
                                validate: value => value === control._formValues.email || 'E-mails não coincidem',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-gray-100 px-4 py-3 rounded outline-none border border-gray-100 focus:border-[#1d69aa] transition ease-in-out duration-150"
                                    placeholder="Confirme seu e-mail"
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
                    </View>

                    <View className="flex flex-col gap-1">
                        <View className="flex flex-row gap-2">
                            <Text className="font-semibold">Confirma Senha</Text>
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
                                placeholder="Confirme sua senha"
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            )}
                        />
                    </View>

                    <View className="mt-3 flex flex-col items-center gap-2">
                        <TouchableOpacity disabled={loading} className="bg-[#1d69aa] p-2 rounded w-full flex flex-row justify-center items-center" onPress={handleSubmit(onSubmit)}>
                            <Text className={`uppercase text-white font-medium ${loading ? 'animate-spin' : ''}`}>
                                {
                                    loading ?
                                    <AntDesign name="loading1" size={16} color="white" />
                                    :
                                    'Cadastrar'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}