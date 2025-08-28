import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const openingUpdate = async (
    horario: string,
) => {
    try {
        await updateDoc(doc(db, 'barbers', 'barber'), {
            horario,
        });

        console.log("Horário de Atendimento da Barbearia atualizado.");
    } catch (err) {
        console.error(err);
    }
};