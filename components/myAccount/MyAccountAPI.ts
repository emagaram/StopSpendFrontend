import { db } from "../../config/firebase";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserPublicData } from "shared";

//TODO Generalize these methods, error handling, get uid from firebase to simplify methods?

export const mergeSetInfo = async (
  partial: Partial<UserPublicData>,
  uid: string
) => {
  const docRef = doc(db, "UserPublic", uid);
  return setDoc(docRef, partial, {
    merge: true,
  });
};

export const updateTimezone = async (timezone: string, uid: string) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    return updateDoc(docRef, {
      timezone: timezone,
    });
  } catch (error) {
    return error;
  }
};

export const updateFirstName = async (firstName: string, uid: string) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    await updateDoc(docRef, {
      firstName: firstName,
    });
  } catch (error) {
    return error;
  }
};

export const updatePhone = async (phone: string, uid: string) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    await updateDoc(docRef, {
      phone: phone,
    });
  } catch (error) {
    return error;
  }
};

export const updateContactOnSpending = async (
  updateOnSpending: boolean,
  uid: string
) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    await updateDoc(docRef, {
      contactOnSpending: updateOnSpending,
    });
  } catch (error) {
    return error;
  }
};

export const updateReceiveEmailMarketing = async (
  receiveEmailMarketing: boolean,
  uid: string
) => {
  try {
    const docRef = doc(db, "UserPublic", uid);
    await updateDoc(docRef, {
      receiveEmailMarketing: receiveEmailMarketing,
    });
  } catch (error) {
    return error;
  }
};
