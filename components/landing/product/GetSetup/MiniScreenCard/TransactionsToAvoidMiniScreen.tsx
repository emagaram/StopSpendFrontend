import { HTMLAttributes } from "react";
import { Stack } from "react-bootstrap";
import AlertInfoButton from "../../../../dashboard/AlertsList/AlertInfoButton";
import MiniScreenCard from "./MiniScreenCard";

export default function TransactionsToAvoid(
  props: HTMLAttributes<HTMLDivElement> & {
    hideGambling?: boolean;
  }
) {
  return (
    <MiniScreenCard
      style={props.style}
      className={props.className}
      header="Problem Spending"
      Contents={
        <Stack
          style={{ pointerEvents: "none", userSelect: "none" }}
          onMouseEnter={(e) => e.stopPropagation()}
          gap={3}
        >
          <AlertInfoButton
            dontShowTimePeriod
            disabled={false}
            editAction={() => {}}
            alertAmountSpent={{ Weekly: 0, Monthly: 0 }}
            alert={{
              category: "Tobacco and Vape",
              spendingLimit: 0,
              timePeriod: "Weekly",
            }}
          />
          {!props.hideGambling && (
            <AlertInfoButton
              dontShowTimePeriod
              disabled={false}
              editAction={() => {}}
              alertAmountSpent={{ Weekly: 25, Monthly: 102.9 }}
              alert={{
                category: "Casinos and Gambling",
                spendingLimit: 0,
                timePeriod: "Weekly",
              }}
            />
          )}
          <AlertInfoButton
            dontShowTimePeriod
            disabled={false}
            editAction={() => {}}
            alertAmountSpent={{ Weekly: 12.2, Monthly: 32.5 }}
            alert={{
              category: "Clothing and Accessories",
              spendingLimit: 120,
              timePeriod: "Monthly",
            }}
          />
          <div className={"add-button"}>+Problem Spending</div>
        </Stack>
      }
    />
  );
}
