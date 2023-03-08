import { AlertFormAction, AlertsFormData } from "../../../../../types";
import ControlLocked from "./ControlLocked";
import ControlUnlocked from "./ControlUnlocked";

export type SpendingLimitControlProps = {
  dispatch: React.Dispatch<AlertFormAction>;
  form: AlertsFormData;
  spendingLimit: number | undefined;
  lockedMode?: boolean;
};

export default function SpendingLimitControl(props: SpendingLimitControlProps) {
  if (props.lockedMode) return <ControlLocked {...props} />;
  return <ControlUnlocked {...props} />;
}
