import { ActivityItemKind } from "shared";
import { ActivityItem } from "../../../types";
import SmallActivityRow from "./SmallActivityRow";

export type ActivityRowProps = {
  activity: ActivityItem;
  openModal: (kind: ActivityItemKind) => void;
  className?: string;
};

export default function ActivityRow(props: ActivityRowProps) {
  return <SmallActivityRow {...props} />;
}

export const amountTransform = (amount: number): string => {
  if (amount < 0) return `+$${Math.abs(amount)}`;
  return `-$${Math.abs(amount)}`;
};
