import { HTMLAttributes } from "react";

export default function StopSpendCard(
  props: { label: string } & HTMLAttributes<HTMLDivElement>
) {
  return (
    <div>
      <div className="ss-card-label">{props.label}</div>
      <div></div>
    </div>
  );
}
