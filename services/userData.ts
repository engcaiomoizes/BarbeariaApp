import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const userData = async (uid: string) => {
    try {
        const data = await getDoc(doc(db, 'users', uid));

        if (data.exists()) {
            return {
                uid: data.id,
                ...data.data(),
            };
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};