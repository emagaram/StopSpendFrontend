import { HTMLAttributes } from "react";
import { Stack } from "react-bootstrap";
import ContactInfoButton from "../../../../dashboard/ContactsList/ContactInfoButton/ContactInfoButton";
import MiniScreenCard from "./MiniScreenCard";

export default function FriendsAndFamilyMiniScreen(
  props: HTMLAttributes<HTMLDivElement>
) {
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
          <ContactInfoButton
            locked={false}
            disabled={false}
            editAction={() => {}}
            name="Grace"
            phone="(123) 456-7890"
          />
          <ContactInfoButton
            locked={false}
            disabled={false}
            editAction={() => {}}
            name="Ron"
            phone="(098) 765-4321"
          />
          <div className={"add-button"}>+Supporter</div>
        </Stack>
      }
      header="Supporters"
    />
  );
}
