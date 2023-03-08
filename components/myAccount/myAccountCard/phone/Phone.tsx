import { useState } from "react";
import { UserPublicData } from "shared";
import { useAuth } from "../../../../contexts/AuthContext";
import { mergeSetInfo } from "../../MyAccountAPI";
import PhoneButton from "./PhoneButton";
import PhoneFormRow from "./PhoneFormRow";

export default function Phone(props: { phone: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth()!;

  return (
    <>
      {!isOpen && (
        <PhoneButton
          phone={props.phone}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isOpen && (
        <PhoneFormRow
          cancelAction={() => {
            setIsOpen(false);
          }}
          confirmAction={async (s: string) => {
            const update: Partial<UserPublicData> = {};
            update.phone = s;
            if (s.length === 0) {
              update.contactOnSpending = false;
            }
            await mergeSetInfo(update, currentUser!.uid);
            setIsOpen(false);
          }}
          phone={props.phone}
        />
      )}
    </>
  );
}
