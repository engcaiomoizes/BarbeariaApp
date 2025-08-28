import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const barberData = async () => {
    try {
        const data = await getDoc(doc(db, 'barbers', 'barber'));
        return data.data();
    } catch (err) {
        console.error(err);
        return null;
    }
};