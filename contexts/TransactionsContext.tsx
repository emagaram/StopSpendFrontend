/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpsCallable } from "firebase/functions";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { functions } from "../config/firebase";
import { GetActivityItemsRequest, GetActivityItemsResponse } from "../types";

const TransactionsContext = createContext<undefined>(undefined);

export function useTransactions() {
  const context = React.useContext(TransactionsContext);
  if (context === undefined)
    throw new Error(
      "useTransactions must be used within a UseTransactionsProvider"
    );

  return context;
}
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  useEffect(() => {}, []);

  const getTransactions = async (
    request: GetActivityItemsRequest
  ): Promise<GetActivityItemsResponse> => {
    try {
      const res = await httpsCallable(
        functions,
        "transactions-default-getTransactions"
      )(request);
      return res.data as GetActivityItemsResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <TransactionsContext.Provider value={undefined}>
      {children}
    </TransactionsContext.Provider>
  );
};
