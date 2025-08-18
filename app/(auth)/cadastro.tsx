import { registerUser } from '@/services/registerUser';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

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
        getValues,
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            await registerUser(data.email, data.password, data.nome, data.telefone);
            router.replace('/(auth)/login');
        } catch (err) {
            Alert.alert("Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const [inputMaskSelected, setInputMaskSelected] = useState(false);

    return (
        <View className="flex pt-10 justify-center items-center">
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
        <Text className="uppercase font-black text-lg">Cadastre-se</Text>

        <View className="flex flex-col gap-2 w-full">
          <FormField
            label="Nome completo"
            error={errors.nome?.message}
            control={control}
            name="nome"
            placeholder="Digite seu nome"
            rules={{
              required: 'Nome obrigatório',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: 'Inválido. Use apenas letras.',
              },
            }}
          />

          <View className="flex flex-col gap-1">
            <LabelWithError label="Telefone" error={errors.telefone?.message} />
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
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type="custom"
                  options={{ mask: '(99) 99999-9999' }}
                  maxLength={15}
                  style={{
                    backgroundColor: '#f3f4f6',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: inputMaskSelected ? '#1d69aa' : '#f3f4f6',
                  }}
                  selectionColor="#1d69aa"
                  onFocus={() => setInputMaskSelected(true)}
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

          <FormField
            label="E-mail"
            error={errors.email?.message}
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            rules={{
              required: 'E-mail obrigatório',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'E-mail inválido',
              },
            }}
          />

          <FormField
            label="Confirma E-mail"
            error={errors.confirmEmail?.message}
            control={control}
            name="confirmEmail"
            placeholder="Confirme seu e-mail"
            keyboardType="email-address"
            rules={{
              required: 'Confirmação obrigatória',
              validate: (value) =>
                value === getValues('email') || 'E-mails não coincidem',
            }}
          />

          <FormField
            label="Senha"
            error={errors.password?.message}
            control={control}
            name="password"
            placeholder="Digite sua senha"
            secureTextEntry
            rules={{
              required: 'Senha obrigatória',
              minLength: { value: 6, message: 'Mínimo de 6 caracteres' },
            }}
          />

          <FormField
            label="Confirma Senha"
            error={errors.confirmPassword?.message}
            control={control}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            secureTextEntry
            rules={{
              required: 'Confirmação obrigatória',
              validate: (value) =>
                value === getValues('password') || 'Senhas não coincidem',
            }}
          />

          <View className="mt-3 flex flex-col items-center gap-2 w-full">
            <TouchableOpacity
              disabled={loading}
              className="bg-[#1d69aa] p-2 rounded flex flex-row justify-center items-center"
              style={{ width: '100%' }}
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <AntDesign name="loading1" size={16} color="white" />
              ) : (
                <Text className="uppercase text-white font-medium">Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
}

type LabelWithErrorProps = {
  label: string;
  error?: string;
};

export const LabelWithError = ({ label, error }: LabelWithErrorProps) => (
  <View className="flex flex-row gap-2">
    <Text className="font-semibold">{label}</Text>
    {error && <Text className="text-red-600 font-medium">{error}</Text>}
  </View>
);

type FormFieldProps<T extends FieldValues> = {
  label: string;
  error?: string;
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
};

export const FormField = <T extends FieldValues>({
  label,
  error,
  control,
  name,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  rules,
}: FormFieldProps<T>) => (
  <View className="flex flex-col gap-1">
    <LabelWithError label={label} error={error} />
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
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
);