import { HTMLAttributes } from "react";
import { Stack } from "react-bootstrap";
import BankInfoButton from "../../../../dashboard/BanksList/BankInfoRow/BankInfoButton/BankInfoButton";
import MiniScreenCard from "./MiniScreenCard";

export default function BanksMiniScreen(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <MiniScreenCard
      className={props.className}
      style={props.style}
      Contents={
        <Stack
          style={{ pointerEvents: "none", userSelect: "none" }}
          onMouseEnter={(e) => e.stopPropagation()}
          gap={2}
        >
          <BankInfoButton
            lockedMode={false}
            bank={{
              name: "Wells Fargo",
              accountNames: ["College"],
              institution_id: "",
              item_id: "",
            }}
          />
          <BankInfoButton
            lockedMode={false}
            bank={{
              name: "Bank of America",
              accountNames: ["Checking"],
              institution_id: "",
              item_id: "",
            }}
          />
          {/* <BankInfoButton lockedMode={false} bank={{
                name:"Citi Bank",
                accountNames:["Checking", "Savings"],
                institution_id:"",
                item_id:"",
            }} /> */}
          <div className={"add-button"}>+Bank</div>
        </Stack>
      }
      header="Banks"
    />
  );
}
