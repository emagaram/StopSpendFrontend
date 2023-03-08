import { BankItem } from "shared";
import BankInfoButtonLocked from "./BankInfoButtonLocked";
import BankInfoButtonUnlocked from "./BankInfoButtonUnlocked";
export default function BankInfoButton(props: {
  bank: BankItem;
  lockedMode: boolean;
}) {
  if (props.lockedMode) return <BankInfoButtonLocked {...props} />;

  return <BankInfoButtonUnlocked {...props} />;
}
