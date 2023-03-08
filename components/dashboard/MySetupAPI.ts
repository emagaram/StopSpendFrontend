import { getAuth, User } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import {
  Alert,
  BankItem,
  Contact,
  ExchangePublicTokenRequest,
  LinkTokenRequest,
  LockedMode,
  OnboardingStep,
  UserPublicData,
  UserPublicDataDefault,
} from "shared";
import { db, functions } from "../../config/firebase";
import createBasicConverter from "../../converters/createBasicConverter";
import { canConnectToFirestore } from "../../utils/canConnectToFirestore";

export async function createUserDocIfFirst(user: User, onCreate: () => void) {
  const docRef = doc(db, "UserPublic", user.uid).withConverter(
    createBasicConverter<UserPublicData>()
  );
  if (!(await getDoc(docRef)).exists()) {
    console.log("Creating Doc");
    //This will also fail if doc exists since it has amountsSpent
    await setDoc(docRef, UserPublicDataDefault);
    onCreate();
  } else {
    console.log("Already exists");
  }
}

let dashboardListenUnsubscribe: Function;
export function listenToDashboard(
  uid: string,
  onExist: (docData: UserPublicData) => void,
  onNotExist?: () => void
) {
  const docRef = doc(db, "UserPublic", uid);
  //TODO see if locked mode works, used .lockedMode on docSnapshot for some reason
  dashboardListenUnsubscribe = onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists() && !docSnapshot.metadata.fromCache) {
      const docData = { ...UserPublicDataDefault, ...docSnapshot.data() };
      onExist(docData);
    } else {
      if (onNotExist) onNotExist();
    }
  });
}

export function cancelListenToDashboard() {
  dashboardListenUnsubscribe();
}

export const getDashboardData = async (
  uid: string
): Promise<UserPublicData | string> => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = { ...UserPublicDataDefault, ...docSnap.data() };
      return data;
    } else {
      return "No such dashboard document!";
    }
  } catch (error) {
    throw error;
  }
};
export const getLinkToken = async (data: LinkTokenRequest) => {
  try {
    const res = await httpsCallable(functions, "auth-sendLinkToken")(data);
    return res.data as string;
  } catch (error) {
    console.log(error);
  }
};

export const updateOnboarding = async (
  onboardingStep: OnboardingStep,
  uid: string
) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    const update: Partial<UserPublicData> = { onboardingStep };
    return updateDoc(docRef, update);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateBank = async (
  newBank: BankItem,
  currentBanks: BankItem[]
) => {
  const newBanks: BankItem[] = currentBanks.map((b) => {
    if (b.item_id == newBank.item_id) {
      return newBank;
    }
    return b;
  });
  const uid = getAuth().currentUser?.uid || "";
  const docRef = doc(db, "UserPublic", uid).withConverter(
    createBasicConverter<UserPublicData>()
  );
  return updateDoc(docRef, {
    banks: newBanks,
  });
};

export const updateLockedMode = async (lockedMode: LockedMode, uid: string) => {
  try {
    if (!(await canConnectToFirestore())) return;
    const update: Partial<UserPublicData> = {
      lockedMode: lockedMode,
    };
    const docRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    return updateDoc(docRef, update);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const exchangeLinkToken = async (
  request: ExchangePublicTokenRequest
) => {
  try {
    return await httpsCallable(functions, "auth-tokenExchange")(request);
  } catch (error) {
    return error;
  }
};

export const addContact = async (c: Contact, uid: string) => {
  try {
    if (!(await canConnectToFirestore())) return;
    const docRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    // Atomically add a new region to the "regions" array field.
    return await updateDoc(docRef, {
      contacts: arrayUnion(c),
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (c: Contact, uid: string) => {
  try {
    if (!(await canConnectToFirestore())) return;
    const docRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    // Atomically add a new region to the "regions" array field.
    await updateDoc(docRef, {
      contacts: arrayRemove(c),
    });
  } catch (error) {
    console.log(error);
  }
};

export const editContact = async (
  contact: Contact,
  rowId: number,
  uid: string,
  contacts: Contact[]
) => {
  try {
    if (!(await canConnectToFirestore())) return;
    const docRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    contacts[rowId] = contact;
    await updateDoc(docRef, {
      contacts: contacts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editAlert = async (
  a: Alert,
  rowId: number,
  uid: string,
  alerts: Alert[]
) => {
  try {
    const userDocRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    alerts[rowId] = { ...a };
    updateDoc(userDocRef, {
      alerts: alerts,
    });
  } catch (error) {
    throw error;
  }
};

export const addAlert = async (a: Alert, uid: string) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    await updateDoc(docRef, {
      alerts: arrayUnion(a),
    });
  } catch (error) {
    console.log(error);
  }
};
export const removeAlert = async (a: Alert, uid: string) => {
  try {
    const docRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    return updateDoc(docRef, {
      alerts: arrayRemove(a),
    });
  } catch (error) {
    console.log(error);
  }
};
export const removeBank = async (
  banks: BankItem[],
  bankToRemove: BankItem,
  uid: string
) => {
  try {
    if (!(await canConnectToFirestore())) return;
    const userDocRef = doc(db, "UserPublic", uid).withConverter(
      createBasicConverter<UserPublicData>()
    );
    const batch = writeBatch(db);
    batch.update(userDocRef, {
      banks: banks.filter((b) => b.item_id !== bankToRemove.item_id),
    });
    batch.update(doc(db, "PlaidItems", bankToRemove.item_id), {
      isDeleted: true,
    });
    return batch.commit();
  } catch (error) {
    throw error;
  }
};
