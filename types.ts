import { QueryDocumentSnapshot } from "@firebase/firestore";
import { ReactNode } from "react";
import type { ITimezone } from "react-timezone-select";
import {
  Alert,
  AlertTextMessage,
  BankItem,
  CategoriesAmountSpent,
  CategoryName,
  Contact,
  GreetingsTextMessage,
  InviteInfo,
  LockedMode,
  OnboardingStep,
  ProgressTextMessage,
  SpendingLimit,
  TimePeriod,
  TransactionResponse,
  UserAlertTextMessage,
  UserPublicData,
} from "shared";
import { CSSProperties } from "styled-components";

export type Transaction = {
  mainCategory: string;
} & TransactionResponse;

export type ActivityItem =
  | Transaction
  | AlertTextMessage
  | GreetingsTextMessage
  | UserAlertTextMessage
  | ProgressTextMessage;

export type FormField<T> = {
  value: T | undefined;
  error: string;
  hasBlurred: boolean;
  beenEdited: boolean;
};

export type ContactsFormData = {
  name: FormField<string>;
  phone: FormField<string>;
  canSubmit: boolean;
  fieldEdited: boolean;
};

export type MyAccountFormData = {
  firstName: FormField<string>;
  lastName: FormField<string>;
  phone: FormField<string>;
  timezone: ITimezone;
  canSubmit: boolean;
  fieldEdited: boolean;
};

export type AlertsFormData = {
  category: FormField<CategoryName>;
  spendingLimit: FormField<SpendingLimit>;
  timePeriod: FormField<TimePeriod>;
  canSubmit: boolean;
  fieldEdited: boolean;
};

export const sameInitialFormFieldData = {
  error: "",
  hasBlurred: false,
  beenEdited: false,
};

export type RowAction<T> =
  | {
      kind: "delete";
      rowNumber: number;
    }
  | {
      kind: "addFront";
      row: T;
    }
  | {
      kind: "addBack";
      row: T;
    }
  | {
      kind: "edit";
      row: T;
      rowNumber: number;
    }
  | {
      kind: "editAll";
      rows: T[];
    };

export type ContactFormAction =
  | {
      kind: "editName";
      proposedValue: string;
    }
  | {
      kind: "editPhone";
      proposedValue: string;
    }
  | {
      kind: "blurName";
    }
  | {
      kind: "blurPhone";
    };

export type AlertFormAction =
  | {
      kind: "editCategory";
      proposedValue: CategoryName;
    }
  | {
      kind: "editLimitAmount";
      proposedValue: SpendingLimit;
    }
  | {
      kind: "editTimePeriod";
      proposedValue: TimePeriod;
    }
  | {
      kind: "blurCategory";
    }
  | {
      kind: "blurSpendingLimit";
    }
  | {
      kind: "blurTimePeriod";
    };
export type RowActions<T> = {
  addToListFront: (item: T) => void;
  addToListBack: (item: T) => void;
  removeFromList: (rowId: number) => void;
  editListItem: (item: T, rowId: number) => void;
  setList: (items: T[]) => void;
};

export type InfoSection = {
  id: string;
  headline: string;
  Description: () => JSX.Element;
  Media: ReactNode;
  topLine?: string;
  first?: boolean;
  textColClassName?: string;
  textColStyle?: CSSProperties;
  mediaColClassName?: string;
  mediaColStyle?: CSSProperties;
};

export type SetupInfoSection = {
  number?: number;
  mediaStart: boolean;
} & InfoSection;

export type AppData = {
  isLoading: boolean;
  shouldRefreshTransactions: boolean;
  setShouldRefreshTransactions: (b: boolean) => void;
  setIsLoading: (b: boolean) => void;
  setLockedMode: (lockedMode: LockedMode | null) => void;
  setTimezone: (s: string) => void;
  setPhone: (s: string) => void;
  setFirstName: (s: string) => void;
  setContactOnSpending: (b: boolean) => void;
  setReceiveEmailMarketing: (b: boolean) => void;
  setAmountsSpent: (a: CategoriesAmountSpent) => void;
  setOnboardingStep: (o: OnboardingStep) => void;
  setInviteInfo: (i: InviteInfo | undefined) => void;
  alertsActions: RowActions<Alert>;
  contactsActions: RowActions<Contact>;
  banksActions: RowActions<BankItem>;
} & UserPublicData;

export enum EditStatus {
  cantEdit,
  canEditButNot,
  inEdit,
}
export enum FormSelectStatus {
  NoRowSelected = -2,
  FormRowSelected = -1,
}

export type GetActivityItemsRequest = {
  uid: string;
  itemType: "texts" | "transactions";
  limit: number;
  userCategories?: CategoryName[];
  startAfterPath?: string;
  includeNonProblemSpending?: boolean;
  fromServer?: boolean;
};

export type GetActivityItemsResponse = {
  items: ActivityItem[];
  incorrectItems: QueryDocumentSnapshot<ActivityItem>[];
  lastDocPath: string;
};

export type CustomWindow = Window &
  typeof globalThis & {
    usePreloadImagesData: any;
  };
export type CookiesType = {
  isLoggedIn?: boolean;
};
export type LoggedInType = boolean | null;
