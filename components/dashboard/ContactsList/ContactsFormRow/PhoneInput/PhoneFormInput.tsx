import PhoneFormInputLocked from "./PhoneFormInputLocked";
import PhoneFormInputUnlocked from "./PhoneFormInputUnlocked";

export default function PhoneFormInput(props: {
  phone: string | undefined;
  setPhone?: (s: string) => void | undefined;
  onBlur?: () => void | undefined;
  submit: () => void;
  lockedMode?: boolean;
}) {
  if (props.lockedMode)
    return <PhoneFormInputLocked {...props} phone={props.phone!} />;

  return <PhoneFormInputUnlocked {...props} />;
}
