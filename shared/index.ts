import { FieldValue, Timestamp } from "@firebase/firestore";
import {
  Category as PlaidCategory,
  PersonalFinanceCategory,
  Transaction,
} from "plaid";
import {
  CategoriesList,
  CategoriesListNames,
  CategoriesListOptions,
  transformCategoryName,
} from "./categoriesList";

export type SMSStatusWebhook = {
  SmsSid: string;
  SmsStatus: "accepted" | "scheduled" | "queued" | "sending" | "sent";
  MessageStatus: string;
  To: string;
  MessagingServiceSid: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
};

export type FirebaseConfig = {
  databaseURL: string;
  storageBucket: string;
  projectId: string;
};

export type FBBetaFeedback = {
  text: string;
  timestamp: Timestamp;
  uid: string;
  navigatorData: {
    connection: {
      downlink: number;
      effectiveType: string;
      rtt: number;
      saveData: boolean | null;
    };
    cookieEnabled: boolean;
    hardwareConcurrency: number;
    language: string;
    userAgent: string;
  };
};

export type OnboardingStep = "seenWelcomeModal" | undefined;

export type InviteInfo = {
  inviteString: string;
  expires: FieldValue;
};

export type UserPublicData = {
  contacts: Contact[];
  banks: BankItem[];
  alerts: Alert[];
  lockedMode: LockedMode | null;
  amountsSpent: CategoriesAmountSpent;
  lastAlertSent?: FieldValue;
  shouldSendProgressUpdate?: boolean; //True if nothing was over budget, determined at time of budget reset
  onboardingStep?: OnboardingStep;
  inviteInfo?: InviteInfo;
} & UserSettings;

export type UserSettings = {
  timezone: string;
  phone: string;
  firstName: string;
  contactOnSpending: boolean;
  receiveEmailMarketing: boolean;
};

export type LockedMode = {
  lastEndDate: Timestamp;
};

export type ActivityItemBE =
  | FbTransaction
  | AlertTextMessage
  | GreetingsTextMessage
  | UserAlertTextMessage;

export enum ActivityItemKind {
  transactionResponse = "transactionResponse",
  alertTextMessage = "alertTextMessage",
  greetingsTextMessage = "greetingsTextMessage",
  userAlertTextMessage = "userAlertTextMessage",
  progressTextMessage = "progressTextMessage",
}

export type TransactionResponse = {
  kind: ActivityItemKind.transactionResponse;
  isProblematicOrEssential: boolean;
  amount: number;
  name: string;
  allCategories: string[];
  date: string;
  bank: string;
  pending: boolean;
  transaction_id: string;
  report: TransactionCategoryReport | null;
  otherIssue: TransactionOtherIssueReport | null;
};

export type AlertTextMessage = {
  kind: ActivityItemKind.alertTextMessage;
  isProblematicOrEssential: boolean;
  contacts: Contact[];
  maybeContacts: Contact[];
  message: string;
  categories: CategoryName[];
  serverTimestamp: FieldValue;
  userName: string;
  isDeleted: boolean;
};

export type ProgressTextMessage = {
  kind: ActivityItemKind.progressTextMessage;
  isProblematicOrEssential: boolean;
  contacts: Contact[];
  maybeContacts: Contact[];
  message: string;
  serverTimestamp: FieldValue;
  userName: string;
  timePeriod: TimePeriod;
};

export type GreetingsTextMessage = {
  kind: ActivityItemKind.greetingsTextMessage;
  contacts: Contact[];
  message: string;
  serverTimestamp: FieldValue;
};

export type UserAlertTextMessage = {
  kind: ActivityItemKind.userAlertTextMessage;
  contacts: Contact[];
  message: string;
  serverTimestamp: FieldValue;
};

export type TextMessage =
  | AlertTextMessage
  | GreetingsTextMessage
  | UserAlertTextMessage
  | ProgressTextMessage;

export type FbGreetingsTextMessage = GreetingsTextMessage;
export type FbAlertTextMessage = AlertTextMessage;
export type FbUserAlertTextMessage = UserAlertTextMessage;

export type FbActivityItem =
  | FbTransaction
  | FbAlertTextMessage
  | FbGreetingsTextMessage
  | FbUserAlertTextMessage;

export type FbTransaction = {
  serverTimestamp: FieldValue | null;
  bank: Bank;
  dateFE: string;
  itemId: string;
  isDeleted: boolean;
} & Transaction &
  Omit<TransactionResponse, "category" | "bank"> &
  CategorizeTransactionType;

export type CategorizeTransactionType = {
  allCategories: string[];
};

export type IssueReport = {
  serverTimestamp: FieldValue;
  closed: boolean;
};

export type ReportedTransaction = Omit<
  TransactionResponse,
  "report" | "otherIssue"
>;

export type TransactionOtherIssueReport = {
  transaction: ReportedTransaction;
  issue: string;
} & IssueReport;

export type TransactionCategoryReport = {
  transaction: ReportedTransaction;
  claimedCategory: string;
} & IssueReport;

export enum MessageCategory {
  Greetings,
  Alert,
}

export type TimePeriod = "Weekly" | "Monthly";

export type Alert = {
  category: CategoryName;
  spendingLimit: number;
  timePeriod: TimePeriod;
};

export type AmountSpent = { [key in TimePeriod]: number };

export type CategoriesAmountSpent = {
  [key in CategoryName]: AmountSpent;
};

export type Contact = {
  name: string;
  phone: string;
};

export type Bank = {
  name: string;
  institution_id: string;
};
export type LinkTokenRequest =
  | {
      item_id: string;
    }
  | undefined;
export type BankItem = {
  item_id: string;
  status?: string; //e.g. ITEM_LOGIN_REQUIRED
  accountNames: string[];
} & Bank;

export type SpendingLimit = number;

export type CategoriesListType = {
  broadCategory: string;
  categories: CategoriesListOptionsType[];
}[];
export type CategoriesListOptionsType = {
  excluding?: CategoriesOptions;
  including: CategoriesOptions;
  name: CategoryName;
};

export const categoryNames = [
  "Beer and Liquor",
  "Fast Food",
  "Vending Machines",
  "Restaurants",
  "All Food and Drink (excluding groceries)",
  "All Food and Drink (including groceries)",
  "Casinos and Gambling",
  "Bank Withdrawals (ATM, Checking, etc.)",
  "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)",
  "Wire Transfers",
  "Bank Overdraft Fees",
  "Clothing and Accessories",
  "Tobacco and Vape",
  "Convenience Stores",
  `Department, Discount, and "Super" Stores`,
  `Online Marketplaces`,
  `All General Merchandise`,
  `Other`,
] as const;

export const amountsSpentDefault: CategoriesAmountSpent = Object.fromEntries(
  categoryNames.map((e) => [
    e,
    {
      Weekly: 0,
      Monthly: 0,
    },
  ])
) as CategoriesAmountSpent;

export const categoryNamesAndTransformNames = [
  "Alternative Payments (Venmo, Paypal, Square Cash, etc.)",
  ...categoryNames,
] as const;

export type CategoryName = typeof categoryNames[number];

export type CategoryNameTransformed =
  typeof categoryNamesAndTransformNames[number];

export type CategoriesOptions = {
  oldCategories?: PlaidCategory[];
  newCategories?: PersonalFinanceCategory[];
};

export {
  CategoriesList,
  CategoriesListNames,
  CategoriesListOptions,
  transformCategoryName,
};

export type ExchangePublicTokenRequest = {
  publicToken: string;
  institutionId: string;
  institutionName: string;
  accountNames: string[];
};

export type InviteUserDataRequest = {
  inviteString?: string;
};

export type InviteUserDataResponse = {
  userName: string;
};

export type SetOrRemoveContactRequest = {
  inviteString: string;
  name: string;
  phone: string;
  kind: "Set" | "Remove";
};

// export type SetOrRemoveContactResponse = {};

export type GreetingsTextRequest = {
  inviteString: string;
  userName: string;
  contactName: string;
  contactPhone: string;
};

const unsubscribeText = `\n\nReply STOP to unsubscribe from all messages.`;

export function greetingsText(userName: string, contactName: string): string {
  return (
    `Hi ${contactName}!\nStopStop here, thanks again for being ${userName}'s supporter! Whenever ${userName} overspends, we'll contact you and you can provide support to ${userName} however you think is best. For more information on StopSpend and how it works, feel free to check out our website: StopSpend.com` +
    unsubscribeText
  );
}

export function alertText(
  userName: string,
  contactName: string,
  categories: CategoryName[]
): string {
  return `Hi ${contactName},\nStopSpend has detected ${userName} has been gone past their spending limits for ${categories
    .map((c) => transformCategoryName(c))
    .join(
      ", "
    )}. If you think it would be helpful, we recommend you reach out to ${userName}. Thanks for your support!`;
}

export function progressText(
  userName: string,
  contactName: string,
  period: TimePeriod
) {
  //New lines matter
  return `Hi ${contactName},\nStopSpend here with good news: ${userName} has followed all their spending limits this past ${
    period === "Weekly" ? "week" : "month"
  }🥳! As always, thanks for your support!`;
}

export function progressTextToUser(userName: string, period: TimePeriod) {
  //New lines matter
  return `Hi ${userName},\nStopSpend here, congratulations on not going over your spending limits this past ${
    period === "Weekly" ? "week" : "month"
  }🥳! We let your supporters know about your good work as well. Keep it up!`;
}
export function supportersNotifiedText(
  userName: string,
  categories: CategoryName[]
) {
  return `Hi ${userName},\nStopSpend has detected that you went over your spending limits for ${categories
    .map((c) => transformCategoryName(c))
    .join(
      ", "
    )}. We notified your supporters, we hope you're doing okay and that you receive helpful support!`;
}
export const UserSettingsDefault: UserSettings = {
  timezone: "",
  phone: "",
  firstName: "",
  receiveEmailMarketing: false,
  contactOnSpending: false,
};

//Do NOT use undefined, will cause firebase error
export const UserPublicDataDefault: UserPublicData = {
  contacts: [],
  banks: [],
  alerts: [],
  lockedMode: null,
  ...UserSettingsDefault,
  amountsSpent: Object.fromEntries(
    categoryNames.map((e) => [e, { Weekly: 0, Monthly: 0 }])
  ) as CategoriesAmountSpent,
};

export const AlertTextMessageDefaultInvisible: Omit<
  AlertTextMessage,
  "serverTimestamp"
> = {
  isDeleted: false,
  categories: [],
  contacts: [],
  maybeContacts: [],
  message:
    "Update after sms-webhook has received that a first message has been sent",
  kind: ActivityItemKind.alertTextMessage,
  isProblematicOrEssential: false,
  userName: "First name",
};
const setCheck = new Set<string>(categoryNames);
export function isCategoryName(category: string): category is CategoryName {
  return setCheck.has(category);
}
export type CustomError = {
  customCode: string;
};

export enum CustomErrorMessages {
  InvalidInviteLink = "The invite link is invalid.",
  ContactsExceeded = "Cannot add any more contacts, the limit has been reached.",
  Unauthenticated = "User not logged in.",
  Internal = "An error has occured. Please try again later.",
}

export const isCustomError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toBeDetermined: any | CustomError
): toBeDetermined is CustomError => {
  return !!(toBeDetermined as CustomError)?.customCode;
};
