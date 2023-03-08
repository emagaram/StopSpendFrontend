import { DocumentData, FirestoreDataConverter } from "@firebase/firestore";

export const createBasicConverter = <T>(): FirestoreDataConverter<T> => {
  return {
    toFirestore: (data) => data as DocumentData,
    fromFirestore: (snap, options) => snap.data(options) as T,
  };
};
export default createBasicConverter;
