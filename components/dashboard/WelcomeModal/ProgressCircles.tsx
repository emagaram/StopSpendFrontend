import classnames from "classnames";
import { HTMLAttributes } from "react";
import styles from "../../../styles/progressCircles.module.scss";
export default function ProgressCircles(
  props: { numSteps: number; current: number } & HTMLAttributes<HTMLDivElement>
) {
  const items: JSX.Element[] = [];
  for (let i = 0; i < props.numSteps; i++) {
    items.push(
      <div
        className={styles["progress-circle-step"]}
        key={"progress-circle-" + i}
        style={{
          left: `${(100 / (props.numSteps - 1)) * i}%`,
          transitionDuration: "300ms",
        }}
      >
        <div
          className={classnames(styles["progress-circle-indexed-step"], {
            [styles["current"]]: i + 1 === props.current,
          })}
        />
      </div>
    );
  }
  return (
    <div
      className={classnames(
        styles["progress-circles-container"],
        props.className
      )}
      style={{ ...props.style }}
    >
      {items}
    </div>
  );
}
