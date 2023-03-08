import classnames from "classnames";
import { CSSProperties } from "react";
import { ActivityItemKind } from "shared";
import { ActivityRowProps } from "./ActivityRow";
import SmallAlertActivityRow from "./SmallAlertActivityRow";
import SmallGreetingsActivityRow from "./SmallGreetingsActivityRow";
import SmallProgressActivityRow from "./SmallProgressActivityRow";
import SmallTransactionsActivityRow from "./SmallTransactionsActivityRow";
export default function SmallActivityRow(props: ActivityRowProps) {
  switch (props.activity.kind) {
    case ActivityItemKind.transactionResponse:
      return (
        <SmallTransactionsActivityRow
          {...props}
          transaction={props.activity}
          openModal={() =>
            props.openModal(ActivityItemKind.transactionResponse)
          }
        />
      );
    case ActivityItemKind.greetingsTextMessage:
      return (
        <SmallGreetingsActivityRow
          {...props}
          activity={props.activity}
          openModal={() =>
            props.openModal(ActivityItemKind.greetingsTextMessage)
          }
        />
      );
    case ActivityItemKind.alertTextMessage:
      return (
        <SmallAlertActivityRow
          activity={props.activity}
          openModal={() => props.openModal(ActivityItemKind.alertTextMessage)}
        />
      );
    case ActivityItemKind.progressTextMessage:
      return (
        <SmallProgressActivityRow
          activity={props.activity}
          openModal={() =>
            props.openModal(ActivityItemKind.progressTextMessage)
          }
        />
      );
    case ActivityItemKind.userAlertTextMessage:
      return <></>;
  }
}

export const StackedText = (props: {
  topText: string;
  bottomText: string;
  bottomStyle?: CSSProperties;
  bottomClassName?: string;
}) => {
  return (
    <div style={{ maxWidth: "100%" }} className="lh-sm">
      <div
        style={{
          color: "#ABABAB",
          fontSize: "min(calc(6.4px + 1.2vw),13px)",
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <strong>{props.topText}</strong>
      </div>
      <div
        className={classnames("hover-bg-highlight", props.bottomClassName)}
        style={{
          fontSize: "min(calc(4.8px + 2.4vw),16px)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "45vw",
          ...props.bottomStyle,
        }}
      >
        {props.bottomText.substring(0, 30)}
      </div>
    </div>
  );
};
