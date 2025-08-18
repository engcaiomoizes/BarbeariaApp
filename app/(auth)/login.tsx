import { loginUser } from "@/services/loginUser";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
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
            const result = await loginUser(data.email, data.password);
            router.replace('/(tabs)/home');
        } catch (err: any) {
            Alert.alert("E-mail e/ou senha incorreto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center">
      <Image style={{ width: 300, height: 200 }} source={require('../../assets/images/logo.png')} />

      <View
        className="px-6 py-4 bg-white rounded-lg flex flex-col items-center gap-4 w-[90%]"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Text className="uppercase font-black text-lg">Fazer Login</Text>

        <View className="flex flex-col gap-2 w-full">
          {/* Campo E-mail */}
          <View className="flex flex-col gap-1">
            <View className="flex flex-row gap-2">
              <Text className="font-semibold">E-mail</Text>
              {errors.email && <Text className="text-red-600 font-medium">{errors.email.message}</Text>}
            </View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'E-mail obrigatório',
                pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
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

          {/* Campo Senha */}
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
                  placeholder="Digite sua senha"
                  secureTextEntry
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
            <Text
              className="text-right text-blue-600 font-medium underline"
              onPress={() => router.push('/(auth)/forgot-password')}
            >
              Esqueci minha senha
            </Text>
          </View>

          {/* Botões */}
          <View className="mt-3 flex flex-col items-center gap-2 w-full">
            <TouchableOpacity
              className="bg-[#1d69aa] p-2 rounded flex flex-row justify-center items-center"
              onPress={handleSubmit(onSubmit)}
              style={{ width: '100%' }}
            >
              {loading ? (
                <AntDesign name="loading1" size={16} color="white" />
              ) : (
                <Text className="uppercase text-white font-medium">Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#eb4034] p-2 rounded flex flex-row justify-center items-center gap-2"
              style={{ width: '100%' }}
            >
              <FontAwesome name="google" size={20} color="white" />
              <Text className="uppercase text-white font-medium">Entrar com Google</Text>
            </TouchableOpacity>

            <Text
              className="uppercase font-medium underline mt-2"
              onPress={() => router.push('/(auth)/cadastro')}
            >
              Criar conta
            </Text>
          </View>
        </View>
      </View>
    </View>
    );
}
