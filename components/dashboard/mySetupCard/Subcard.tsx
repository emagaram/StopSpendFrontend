import { HTMLAttributes } from "react";
import classnames from "classnames";
export default function Subcard(
  props: {
    title: string;
    subTitle?: string;
    children?: JSX.Element;
  } & HTMLAttributes<HTMLDivElement>
) {
  return (
    <div className={classnames("py-2", props.className)} style={props.style}>
      <div className="mb-3">
        <div>
          <span className="ss-subcard-title">{props.title}</span>
        </div>
        <div className="ss-subcard-subtitle">{props.subTitle}</div>
      </div>
      {props.children}
    </div>
  );
}
