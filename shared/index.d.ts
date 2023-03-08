import { FieldValue, Timestamp } from "@firebase/firestore";
import { Category as PlaidCategory, PersonalFinanceCategory, Transaction } from "plaid";
import { CategoriesList, CategoriesListNames, CategoriesListOptions, transformCategoryName } from "./categoriesList";
export declare type SMSStatusWebhook = {
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
export declare type FirebaseConfig = {
    databaseURL: string;
    storageBucket: string;
    projectId: string;
};
export declare type FBBetaFeedback = {
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
export declare type OnboardingStep = "seenWelcomeModal" | undefined;
export declare type InviteInfo = {
    inviteString: string;
    expires: FieldValue;
};
export declare type UserPublicData = {
    contacts: Contact[];
    banks: BankItem[];
    alerts: Alert[];
    lockedMode: LockedMode | null;
    amountsSpent: CategoriesAmountSpent;
    lastAlertSent?: FieldValue;
    shouldSendProgressUpdate?: boolean;
    onboardingStep?: OnboardingStep;
    inviteInfo?: InviteInfo;
} & UserSettings;
export declare type UserSettings = {
    timezone: string;
    phone: string;
    firstName: string;
    contactOnSpending: boolean;
    receiveEmailMarketing: boolean;
};
export declare type LockedMode = {
    lastEndDate: Timestamp;
};
export declare type ActivityItemBE = FbTransaction | AlertTextMessage | GreetingsTextMessage | UserAlertTextMessage;
export declare enum ActivityItemKind {
    transactionResponse = "transactionResponse",
    alertTextMessage = "alertTextMessage",
    greetingsTextMessage = "greetingsTextMessage",
    userAlertTextMessage = "userAlertTextMessage",
    progressTextMessage = "progressTextMessage"
}
export declare type TransactionResponse = {
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
export declare type AlertTextMessage = {
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
export declare type ProgressTextMessage = {
    kind: ActivityItemKind.progressTextMessage;
    isProblematicOrEssential: boolean;
    contacts: Contact[];
    maybeContacts: Contact[];
    message: string;
    serverTimestamp: FieldValue;
    userName: string;
    timePeriod: TimePeriod;
};
export declare type GreetingsTextMessage = {
    kind: ActivityItemKind.greetingsTextMessage;
    contacts: Contact[];
    message: string;
    serverTimestamp: FieldValue;
};
export declare type UserAlertTextMessage = {
    kind: ActivityItemKind.userAlertTextMessage;
    contacts: Contact[];
    message: string;
    serverTimestamp: FieldValue;
};
export declare type TextMessage = AlertTextMessage | GreetingsTextMessage | UserAlertTextMessage | ProgressTextMessage;
export declare type FbGreetingsTextMessage = GreetingsTextMessage;
export declare type FbAlertTextMessage = AlertTextMessage;
export declare type FbUserAlertTextMessage = UserAlertTextMessage;
export declare type FbActivityItem = FbTransaction | FbAlertTextMessage | FbGreetingsTextMessage | FbUserAlertTextMessage;
export declare type FbTransaction = {
    serverTimestamp: FieldValue | null;
    bank: Bank;
    dateFE: string;
    itemId: string;
    isDeleted: boolean;
} & Transaction & Omit<TransactionResponse, "category" | "bank"> & CategorizeTransactionType;
export declare type CategorizeTransactionType = {
    allCategories: string[];
};
export declare type IssueReport = {
    serverTimestamp: FieldValue;
    closed: boolean;
};
export declare type ReportedTransaction = Omit<TransactionResponse, "report" | "otherIssue">;
export declare type TransactionOtherIssueReport = {
    transaction: ReportedTransaction;
    issue: string;
} & IssueReport;
export declare type TransactionCategoryReport = {
    transaction: ReportedTransaction;
    claimedCategory: string;
} & IssueReport;
export declare enum MessageCategory {
    Greetings = 0,
    Alert = 1
}
export declare type TimePeriod = "Weekly" | "Monthly";
export declare type Alert = {
    category: CategoryName;
    spendingLimit: number;
    timePeriod: TimePeriod;
};
export declare type AmountSpent = {
    [key in TimePeriod]: number;
};
export declare type CategoriesAmountSpent = {
    [key in CategoryName]: AmountSpent;
};
export declare type Contact = {
    name: string;
    phone: string;
};
export declare type Bank = {
    name: string;
    institution_id: string;
};
export declare type LinkTokenRequest = {
    item_id: string;
} | undefined;
export declare type BankItem = {
    item_id: string;
    status?: string;
    accountNames: string[];
} & Bank;
export declare type SpendingLimit = number;
export declare type CategoriesListType = {
    broadCategory: string;
    categories: CategoriesListOptionsType[];
}[];
export declare type CategoriesListOptionsType = {
    excluding?: CategoriesOptions;
    including: CategoriesOptions;
    name: CategoryName;
};
export declare const categoryNames: readonly ["Beer and Liquor", "Fast Food", "Vending Machines", "Restaurants", "All Food and Drink (excluding groceries)", "All Food and Drink (including groceries)", "Casinos and Gambling", "Bank Withdrawals (ATM, Checking, etc.)", "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)", "Wire Transfers", "Bank Overdraft Fees", "Clothing and Accessories", "Tobacco and Vape", "Convenience Stores", "Department, Discount, and \"Super\" Stores", "Online Marketplaces", "All General Merchandise", "Other"];
export declare const amountsSpentDefault: CategoriesAmountSpent;
export declare const categoryNamesAndTransformNames: readonly ["Alternative Payments (Venmo, Paypal, Square Cash, etc.)", "Beer and Liquor", "Fast Food", "Vending Machines", "Restaurants", "All Food and Drink (excluding groceries)", "All Food and Drink (including groceries)", "Casinos and Gambling", "Bank Withdrawals (ATM, Checking, etc.)", "Transfer to Peers (Venmo, Paypal, Square Cash, etc.)", "Wire Transfers", "Bank Overdraft Fees", "Clothing and Accessories", "Tobacco and Vape", "Convenience Stores", "Department, Discount, and \"Super\" Stores", "Online Marketplaces", "All General Merchandise", "Other"];
export declare type CategoryName = typeof categoryNames[number];
export declare type CategoryNameTransformed = typeof categoryNamesAndTransformNames[number];
export declare type CategoriesOptions = {
    oldCategories?: PlaidCategory[];
    newCategories?: PersonalFinanceCategory[];
};
export { CategoriesList, CategoriesListNames, CategoriesListOptions, transformCategoryName, };
export declare type ExchangePublicTokenRequest = {
    publicToken: string;
    institutionId: string;
    institutionName: string;
    accountNames: string[];
};
export declare type InviteUserDataRequest = {
    inviteString?: string;
};
export declare type InviteUserDataResponse = {
    userName: string;
};
export declare type SetOrRemoveContactRequest = {
    inviteString: string;
    name: string;
    phone: string;
    kind: "Set" | "Remove";
};
export declare type GreetingsTextRequest = {
    inviteString: string;
    userName: string;
    contactName: string;
    contactPhone: string;
};
export declare function greetingsText(userName: string, contactName: string): string;
export declare function alertText(userName: string, contactName: string, categories: CategoryName[]): string;
export declare function progressText(userName: string, contactName: string, period: TimePeriod): string;
export declare function progressTextToUser(userName: string, period: TimePeriod): string;
export declare function supportersNotifiedText(userName: string, categories: CategoryName[]): string;
export declare const UserSettingsDefault: UserSettings;
export declare const UserPublicDataDefault: UserPublicData;
export declare const AlertTextMessageDefaultInvisible: Omit<AlertTextMessage, "serverTimestamp">;
export declare function isCategoryName(category: string): category is CategoryName;
export declare type CustomError = {
    customCode: string;
};
export declare enum CustomErrorMessages {
    InvalidInviteLink = "The invite link is invalid.",
    ContactsExceeded = "Cannot add any more contacts, the limit has been reached.",
    Unauthenticated = "User not logged in.",
    Internal = "An error has occured. Please try again later."
}
export declare const isCustomError: (toBeDetermined: any | CustomError) => toBeDetermined is CustomError;
