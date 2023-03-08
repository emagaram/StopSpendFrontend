import React, { useReducer, useState } from "react";
import {
  Alert,
  BankItem,
  Contact,
  InviteInfo,
  LockedMode,
  OnboardingStep,
  UserPublicDataDefault,
} from "shared";
import { AppData, RowAction } from "../types";
const createReducer =
  <T extends {}>() =>
  (state: T[], action: RowAction<T>) => {
    switch (action.kind) {
      case "addFront": {
        const result = [...state];
        result.unshift(action.row);
        return result;
      }
      case "addBack": {
        const result = [...state];
        result.push(action.row);
        return result;
      }
      case "delete": {
        const result = [...state];
        result.splice(action.rowNumber, 1);
        return result;
      }
      case "edit": {
        //Also works for add
        const result = [...state];
        result[action.rowNumber] = action.row;
        return result;
      }
      case "editAll": {
        return [...action.rows];
      }
      default:
        throw new Error();
    }
  };

export function useDataInitializer(): AppData {
  const [contacts, contactsDispatch] = useReducer(
    createReducer<Contact>(),
    UserPublicDataDefault.contacts
  );
  const [banks, banksDispatch] = useReducer(
    createReducer<BankItem>(),
    UserPublicDataDefault.banks
  );
  const [alerts, alertsDispatch] = useReducer(
    createReducer<Alert>(),
    UserPublicDataDefault.alerts
  );
  const [timezone, setTimezone] = useState(UserPublicDataDefault.timezone);
  const [phone, setPhone] = useState(UserPublicDataDefault.phone);
  const [firstName, setFirstName] = useState(UserPublicDataDefault.firstName);
  const [contactOnSpending, setContactOnSpending] = useState(
    UserPublicDataDefault.contactOnSpending
  );
  const [receiveEmailMarketing, setReceiveEmailMarketing] = useState(
    UserPublicDataDefault.receiveEmailMarketing
  );
  const [amountsSpent, setAmountsSpent] = useState(
    UserPublicDataDefault.amountsSpent
  );
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(
    UserPublicDataDefault.onboardingStep
  );
  const [inviteInfo, setInviteInfo] = useState<InviteInfo | undefined>();

  const listActions = <T extends {}>(
    dispatch: React.Dispatch<RowAction<T>>
  ) => {
    return {
      addToListFront: (item: T) => dispatch({ kind: "addFront", row: item }),
      addToListBack: (item: T) => dispatch({ kind: "addBack", row: item }),
      removeFromList: (rowNumber: number) =>
        dispatch({ kind: "delete", rowNumber: rowNumber }),
      editListItem: (item: T, rowNumber: number) =>
        dispatch({ kind: "edit", row: item, rowNumber: rowNumber }),
      setList: (rows: T[]) => {
        //debugger
        dispatch({ kind: "editAll", rows: rows });
      },
    };
  };
  const alertsActions = listActions(alertsDispatch);
  const contactsActions = listActions(contactsDispatch);
  const banksActions = listActions(banksDispatch);

  const [isLoading, setIsLoading] = useState(true);
  const [lockedMode, setLockedMode] = useState<LockedMode | null>(null);

  const [shouldRefreshTransactions, setShouldRefreshTransactions] =
    useState(false);

  const data: AppData = {
    amountsSpent,
    contacts,
    banks,
    alerts,
    lockedMode,
    isLoading,
    phone,
    firstName,
    alertsActions,
    contactsActions,
    banksActions,
    timezone,
    contactOnSpending,
    receiveEmailMarketing,
    shouldRefreshTransactions,
    onboardingStep,
    inviteInfo,
    setIsLoading,
    setPhone,
    setLockedMode,
    setTimezone,
    setFirstName,
    setContactOnSpending,
    setReceiveEmailMarketing,
    setAmountsSpent,
    setShouldRefreshTransactions,
    setOnboardingStep,
    setInviteInfo,
  };

  return data;
  //useMemo(() => data, [{ contacts, banks, alerts, onboardingStep }])
}
