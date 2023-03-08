import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { updateFirstName } from "../../MyAccountAPI";
import NameButton from "./NameButton";
import NameFormRow from "./NameFormRow";

export default function Name(props: {
  firstName: string;
  setFirstName: (s: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth()!;
  return (
    <>
      {!isOpen && (
        <NameButton
          name={props.firstName}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      {isOpen && (
        <NameFormRow
          cancelAction={() => {
            setIsOpen(false);
          }}
          confirmAction={async (s: string) => {
            await updateFirstName(s, currentUser!.uid);
            props.setFirstName(s);
            setIsOpen(false);
          }}
          firstName={props.firstName}
        />
      )}
    </>
  );
}
