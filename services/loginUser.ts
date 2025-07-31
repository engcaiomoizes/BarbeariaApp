import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (
    email: string,
    password: string
) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
};