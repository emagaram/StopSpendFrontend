import { FirestoreDataConverter } from "@firebase/firestore";
import { ActivityItem, Transaction } from "../types";
import {
  ActivityItemBE,
  ActivityItemKind,
  CategoryName,
  FbTransaction,
  TransactionResponse,
} from "shared";
import { categoryNames } from "shared";

export const createActivityItemsConverter = (
  userCategories: CategoryName[]
): FirestoreDataConverter<ActivityItem> => {
  return {
    toFirestore: () => {
      return {};
    },
    fromFirestore: (snap, options) =>
      convertActivityItemBEToFE(
        snap.data(options) as ActivityItemBE,
        userCategories
      ),
  };
};

const convertActivityItemBEToFE = (
  aib: ActivityItemBE,
  userCategories: CategoryName[]
): ActivityItem => {
  if (aib.kind === ActivityItemKind.transactionResponse) {
    const tr = convertFbTransactionToTransactionResponse(aib);
    const transaction: Transaction = {
      ...tr,
      mainCategory: getMainCategory(aib.allCategories, userCategories),
    };
    return transaction;
  }
  return aib;
};

const getMainCategory = (
  transactionCategories: string[],
  userCategories: CategoryName[]
) => {
  let broadCategories: CategoryName[] = [
    "All Food and Drink (excluding groceries)",
    "All Food and Drink (including groceries)",
    "All General Merchandise",
  ];
  let category: CategoryName | undefined;
  userCategories.forEach((name) => {
    if (transactionCategories.includes(name)) {
      category = name;
      if (broadCategories.includes(category)) {
        return category;
      }
    }
  });
  if (category) return category;

  broadCategories.forEach((name) => {
    if (transactionCategories.includes(name)) {
      return name;
    }
  });
  categoryNames.forEach((name) => {
    if (transactionCategories.includes(name)) {
      return name;
    }
  });
  return transactionCategories[0];
};

const convertFbTransactionToTransactionResponse = (
  fbt: FbTransaction
): TransactionResponse => {
  return {
    amount: fbt.amount,
    bank: fbt.bank.name,
    date: fbt.dateFE,
    name: fbt.name,
    pending: fbt.pending,
    transaction_id: fbt.transaction_id,
    report: fbt.report,
    otherIssue: fbt.otherIssue,
    allCategories: fbt.allCategories,
    kind: fbt.kind,
    isProblematicOrEssential: fbt.isProblematicOrEssential,
  };
};

export default createActivityItemsConverter;
