import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
    id: string,
    nome: string,
    telefone: string,
) => {
    try {
        await updateDoc(doc(db, 'users', id), {
            nome,
            telefone,
        });

        console.log("Telefone atualizado.");
    } catch (err) {
        console.error(err);
    }
};