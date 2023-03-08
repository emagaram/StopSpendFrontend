import classnames from "classnames";
import { HTMLAttributes } from "react";
import "../../../../progressBar.scss";
export default function ProgressCircles(
  props: { numSteps: number; current: number } & HTMLAttributes<HTMLDivElement>
) {
  const items: JSX.Element[] = [];
  for (let i = 0; i < props.numSteps; i++) {
    items.push(
      <div
        key={"progress-circles-" + i}
        style={{ left: `${(100 / (props.numSteps - 1)) * i}%` }}
        className={classnames("progress-bar-step")}
      >
        <div
          className={classnames("progress-bar-indexed-step position-relative", {
            accomplished: i < props.current - 1,
            current: i === props.current - 1,
          })}
        >
          {i + 1}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ ...props.style }}
      className={classnames("progress-bar-outer", props.className)}
    >
      {items}
      <div
        style={{
          width: `${Math.min(
            (100 / (props.numSteps - 1)) * (props.current - 1),
            100
          )}%`,
        }}
        className="progress-bar-progression"
      ></div>
    </div>
  );
}
