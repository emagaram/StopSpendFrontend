import { useState } from "react";
import { TransactionResponse } from "shared";
import { Transaction } from "../../../../types";
import OtherIssueContent from "./OtherIssueContent";
import ReportCategoryConfirmedContent from "./ReportCategoryConfirmedContent";
import ReportCategoryContent from "./ReportCategoryContent";
import TransactionContent from "./TransactionContent";
export enum Screen {
  Transaction,
  ReportCategory,
  ReportCategoryConfirmed,
  ReportOther,
  //MessageSent,
}
export default function TransactionActivityContentController(props: {
  onClose: () => void;
  activity: Transaction | undefined;
}) {
  const [screen, setScreen] = useState<Screen>(Screen.Transaction);

  const CurrentScreen = () => {
    switch (screen) {
      case Screen.Transaction:
        return (
          <TransactionContent
            setScreen={setScreen}
            transaction={props.activity!}
          />
        );
      case Screen.ReportCategory:
        return (
          <ReportCategoryContent
            setScreen={setScreen}
            category={props.activity?.mainCategory || ""}
            onClose={props.onClose}
            transaction={props.activity!}
          />
        );
      case Screen.ReportOther:
        return (
          <OtherIssueContent
            setScreen={setScreen}
            transaction={props.activity as TransactionResponse}
          />
        );
      case Screen.ReportCategoryConfirmed:
        return <ReportCategoryConfirmedContent onClose={props.onClose} />;
    }
  };

  return <CurrentScreen />;
}
