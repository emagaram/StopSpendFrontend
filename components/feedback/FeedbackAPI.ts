import { addDoc, collection, Timestamp } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { DateTime } from "luxon";
import { FBBetaFeedback } from "shared";
import { db } from "../../config/firebase";

export const sendFeedback = async (text: string) => {
  const navigatorTypeFree = navigator as any;
  try {
    const uid = getAuth().currentUser?.uid;
    const feedbackCol = collection(db, "BetaFeedback");
    const data: FBBetaFeedback = {
      timestamp: new Timestamp(DateTime.now().toSeconds(), 0),
      text: text,
      uid: uid || "anonymous",
      navigatorData: {
        connection: {
          downlink:
            (navigatorTypeFree.connection as any).downlink !== undefined
              ? (navigatorTypeFree.connection as any).downlink
              : -1000,
          effectiveType:
            (navigatorTypeFree.connection as any).effectiveType || "none",
          rtt:
            (navigatorTypeFree.connection as any).rtt !== undefined
              ? (navigatorTypeFree.connection as any).rtt
              : -1000,
          saveData:
            (navigatorTypeFree.connection as any).saveData !== undefined
              ? (navigatorTypeFree.connection as any).saveData
              : null,
        },
        cookieEnabled: navigator.cookieEnabled,
        hardwareConcurrency: navigator.hardwareConcurrency,
        language: navigator.language,
        userAgent: navigator.userAgent,
      },
    };
    console.log("QFEOB: " + uid);
    await addDoc(feedbackCol, data);
  } catch (e) {
    console.error(e);
  }
};
