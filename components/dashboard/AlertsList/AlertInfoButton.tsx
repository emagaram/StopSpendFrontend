import { Alert, AmountSpent, transformCategoryName } from "shared";
import AlertTags from "./AlertTags";

export default function AlertInfoButton(props: {
  alert: Alert;
  alertAmountSpent: AmountSpent;
  disabled: boolean;
  editAction: () => void;
  dontShowTimePeriod?: boolean;
}) {
  return (
    <div
      style={{
        lineHeight: "1.2rem",
        width: "fit-content",
        cursor: "pointer",
      }}
      className={props.disabled ? "disabled" : ""}
      onClick={props.editAction}
    >
      <div className={"hover-bg-highlight " + (!props.disabled && "clickable")}>
        {transformCategoryName(props.alert.category)}
      </div>

      <small className="subtext-color" style={{ overflow: "hidden" }}>
        <AlertTags
          {...props.alert}
          dontShowTimePeriod={props.dontShowTimePeriod}
          amountSpent={props.alertAmountSpent[props.alert.timePeriod]}
        />
      </small>
    </div>
  );
}
