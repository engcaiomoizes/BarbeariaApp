import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (
    email: string,
    password: string,
    nome: string,
    telefone: string
): Promise<void> => {
    try {
        // Cria o usuário no Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Salva dados extras no Firestore
        await setDoc(doc(db, 'users', uid), {
            nome,
            telefone,
            email,
            createdAt: new Date()
        });

        console.log('Usuário cadastrado com sucesso!');
    } catch (err: any) {
        console.error('Erro ao cadastrar: ', err.message);
    }
};