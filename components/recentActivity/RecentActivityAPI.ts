import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getDocsFromServer,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  ActivityItemKind,
  ReportedTransaction,
  TextMessage,
  TransactionCategoryReport,
  TransactionOtherIssueReport,
  TransactionResponse,
} from "shared";
import { db } from "../../config/firebase";
import createActivityItemsConverter from "../../converters/activityItemsConverter";
import {
  ActivityItem,
  GetActivityItemsRequest,
  GetActivityItemsResponse,
} from "../../types";

export const getActivityItems = async (
  request: GetActivityItemsRequest
): Promise<GetActivityItemsResponse> => {
  const constraints: QueryConstraint[] = [
    limit(request.limit),
    where("isDeleted", "==", false),
  ];
  if (request.itemType === "texts") {
    constraints.push(
      where("kind", "in", [
        ActivityItemKind.alertTextMessage,
        ActivityItemKind.greetingsTextMessage,
      ]),
      orderBy("serverTimestamp", "desc"),
      where("isProblematicOrEssential", "==", true)
    );
  } else {
    if (!request.includeNonProblemSpending) {
      constraints.push(where("isProblematicOrEssential", "==", true));
    }
    constraints.push(
      where("kind", "in", [ActivityItemKind.transactionResponse]),
      orderBy("dateFE", "desc")
    );
  }
  if (request.startAfterPath) {
    // Not putting inside of constraints push fixes it?!
    const a = await getDoc(doc(db, request.startAfterPath));
    constraints.push(startAfter(a));
  }
  const activityQuery = query(
    collection(db, `UserPublic/${request.uid}/ActivityItems`),
    ...constraints
  ).withConverter(
    createActivityItemsConverter(
      request.userCategories ? request.userCategories : []
    )
  );
  let docs: QueryDocumentSnapshot<ActivityItem>[] = [];
  if (request.fromServer)
    docs = docs.concat((await getDocsFromServer(activityQuery)).docs);
  else {
    const dcs = (await getDocs(activityQuery)).docs; //Weird bug occuring if await inside of following line
    docs = docs.concat(dcs);
  }

  const incorrectItems: QueryDocumentSnapshot<ActivityItem>[] = [];
  const correctItems = docs
    .filter((doc) => {
      const data = doc.data();
      if (data.kind !== ActivityItemKind.transactionResponse) {
        return true;
      }
      if (request.includeNonProblemSpending) return true;
      if (!request.userCategories) return false;

      const intersected = request.userCategories.filter((value) =>
        data.allCategories.includes(value)
      );
      if (intersected.length > 0) {
        return true;
      }

      // Safety to ensure this won't be called when useGlobal is still loading in UserPublicData
      if (request.userCategories.length !== 0) {
        console.log("Pushing incorrect");
        incorrectItems.push(doc);
      }
      return false;
    })
    .map((doc) => doc.data());
  return {
    items: correctItems,
    incorrectItems: incorrectItems,
    lastDocPath: docs.length > 0 ? docs[docs.length - 1].ref.path : "",
  };
};

export const createTransactionCategoryReport = async (
  transaction: TransactionResponse,
  claimedCategory: string
) => {
  const reportedTransaction: ReportedTransaction = transaction;
  try {
    let docRef = (
      await getDocs(
        query(
          collection(
            db,
            `UserPublic/${getAuth().currentUser?.uid}/ActivityItems`
          ),
          limit(1),
          where("transaction_id", "==", transaction.transaction_id),
          where("isDeleted", "==", false)
        )
      )
    ).docs[0].ref;
    const report: TransactionCategoryReport = {
      transaction: reportedTransaction,
      claimedCategory,
      serverTimestamp: serverTimestamp(),
      closed: false,
    };
    return updateDoc(docRef, { report: report });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOtherIssueReport = async (
  transaction: TransactionResponse,
  issue: string
) => {
  const currentUser = getAuth().currentUser;
  if (!currentUser?.uid) {
    return;
  }
  try {
    let docRef = (
      await getDocs(
        query(
          collection(db, `UserPublic/${currentUser.uid}/ActivityItems`),
          limit(1),
          where("transaction_id", "==", transaction.transaction_id),
          where("isDeleted", "==", false)
        )
      )
    ).docs[0].ref;
    const report: TransactionOtherIssueReport = {
      closed: false,
      issue: issue,
      serverTimestamp: serverTimestamp(),
      transaction: transaction,
    };
    return await updateDoc(docRef, { report: report });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function createTextAlertDoc(
  textMessage: TextMessage,
  uid: string
) {
  return await addDoc(
    collection(db, `UserPublic/${uid}/ActivityItems`),
    textMessage
  );
}
