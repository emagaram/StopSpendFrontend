import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function ProgressPie({ percentage }: { percentage: number }) {
  return (
    <CircularProgressbar
      styles={buildStyles({
        pathColor: "#68a762",
        trailColor: "#ffffff",
        textColor: "#000000",
        textSize: "1.563rem",
      })}
      value={percentage + 1}
      text={`${percentage / 33}/3`}
    />
  );
}
