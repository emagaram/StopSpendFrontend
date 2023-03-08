import { getAuth } from "firebase/auth";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "../config/firebase";

async function canConnectToFirestoreInner() {
  if (!navigator.onLine) {
    return false;
  }
  try {
    await getDocFromServer(doc(db, `UserPublic/${getAuth().currentUser?.uid}`));
    return true;
  } catch (e) {
    return false;
  }
}

export let canConnectToFirestore: () => Promise<boolean>;

export function setCanConnectToFirestore(
  setOnlineStatus: (b: boolean) => void
) {
  canConnectToFirestore = async () => {
    if (await canConnectToFirestoreInner()) {
      setOnlineStatus(true);
      return true;
    }
    setOnlineStatus(false);
    return false;
  };
}
