import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";


export const logoutUser = async () => {
    await signOut(auth);
}