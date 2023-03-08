import ContactInfoButtonLocked from "./ContactInfoButtonLocked";
import ContactInfoButtonUnlocked from "./ContactInfoButtonUnlocked";

export default function ContactInfoButton(props: {
  name: string;
  phone: string;
  disabled: boolean;
  editAction: () => void;
  locked: boolean;
}) {
  if (props.locked) return <ContactInfoButtonLocked {...props} />;
  return <ContactInfoButtonUnlocked {...props} />;
}
