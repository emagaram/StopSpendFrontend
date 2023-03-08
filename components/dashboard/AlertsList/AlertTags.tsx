import classnames from "classnames";
import { DateTime, Duration } from "luxon";
import { Stack } from "react-bootstrap";
import { FaCalendarAlt, FaThermometerEmpty } from "react-icons/fa";
import { TimePeriod } from "shared";
import { useTime } from "../../../contexts/TimeContext";
export default function AlertTags(props: {
  spendingLimit: number;
  amountSpent: number;
  timePeriod: TimePeriod;
  dontShowTimePeriod?: boolean;
  timezone?: string;
}) {
  return (
    <Stack
      direction="horizontal"
      style={{ flexWrap: "wrap" }}
      className="mt-1 mt-sm-0"
    >
      {props.spendingLimit > 0 && (
        <div
          className={classnames("d-flex align-items-center me-2", {
            danger: props.amountSpent > props.spendingLimit,
          })}
        >
          <FaThermometerEmpty />${props.amountSpent.toFixed(2)}/$
          {props.spendingLimit} spent
        </div>
      )}
      {props.spendingLimit === 0 && (
        <div className="me-2">
          None allowed
          {props.amountSpent > 0 ? (
            <>
              :{" "}
              <span
                className={classnames({
                  danger: props.amountSpent > props.spendingLimit,
                })}
              >
                ${props.amountSpent.toFixed(2)} spent
              </span>
            </>
          ) : (
            ``
          )}
        </div>
      )}
      <Calendar
        timePeriod={props.timePeriod}
        className="d-flex align-items-center"
      ></Calendar>
    </Stack>
  );
}

export const Calendar = (
  props: {
    timePeriod: TimePeriod;
    timezone?: string;
  } & React.HTMLAttributes<HTMLSpanElement>
) => {
  let now = DateTime.fromMillis(useTime());
  const timeLeft = (timePeriod: TimePeriod, timezone?: string) => {
    if (timezone) now = now.setZone(timezone);
    let remaining: Duration;
    if (timePeriod === "Weekly") {
      remaining = now.endOf("week").diff(now, ["days"]);
    } else {
      remaining = now.endOf("month").diff(now, ["days"]);
    }
    let days = remaining.days;
    let hours = days * 24;
    let minutes = hours * 60;
    if (days > 1) {
      return `${Math.round(days)} days left`;
    } else if (hours > 1) {
      return `${Math.round(hours)} hours left`;
    }
    return `${Math.round(minutes)} minute${
      Math.round(minutes) > 1 ? "s" : ""
    } left`;
  };
  return (
    <span className={props.className} style={props.style}>
      <FaCalendarAlt
        style={{ marginRight: "0.125em", marginBottom: "0.0625em" }}
      />
      {props.timePeriod.toString()},{" "}
      {timeLeft(props.timePeriod, props.timezone)}
    </span>
  );
};
