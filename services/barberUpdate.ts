import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const barberUpdate = async (
    nome: string,
    endereco: string,
    telefone: string,
) => {
    try {
        await updateDoc(doc(db, 'barbers', 'barber'), {
            nome,
            endereco,
            telefone,
        });

        console.log("Dados da Barbearia atualizados.");
    } catch (err) {
        console.error(err);
    }
};