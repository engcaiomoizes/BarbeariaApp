import ChangePassword from '@/components/changePassword';
import ForgotCode from '@/components/forgotCode';
import ForgotPasswordEmail from '@/components/forgotPassword';
import { useState } from 'react';
import { Image, View } from "react-native";

type FormData = {
    email: string;
};

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    return (
        <View className="flex pt-10 justify-center items-center">
            <Image style={{ width: 300, height: 200 }} source={require('../../assets/images/logo.png')} />
            {
                email == "" ?
                <ForgotPasswordEmail onSend={(em) => setEmail(em)} />
                : code == "" ?
                <ForgotCode email={email} onSend={(cd) => setCode(cd)} />
                :
                <ChangePassword />
            }
        </View>
    );
}