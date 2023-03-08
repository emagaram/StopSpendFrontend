import { Timestamp } from "@firebase/firestore";
import classnames from "classnames";
import { DateTime } from "luxon";
import { HTMLAttributes } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { LockedMode } from "shared";
import { useTime } from "../../../contexts/TimeContext";
export default function EnableLockedMode(
  props: {
    lockedMode: LockedMode | null;
    continueAction: () => void;
    numDays: number;
    setNumDays: (n: number) => void;
  } & HTMLAttributes<HTMLDivElement>
) {
  const now = useTime();
  if (
    props.lockedMode === null ||
    props.lockedMode.lastEndDate.toMillis() < now
  ) {
    return (
      <Container
        fluid
        className={classnames(props.className, "p-0")}
        style={props.style}
      >
        <Row>
          <Col style={{ lineHeight: "1.5rem" }} className="pe-0" xs="auto">
            <span>
              Enable locked mode for{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                <input
                  maxLength={2}
                  className="underline-input"
                  pattern="\d*"
                  style={{ width: "2.5rem", display: "inline" }}
                  aria-label="number of days"
                  value={props.numDays}
                  onChange={(e) => {
                    let num = parseInt(e.target.value);

                    if ((num || num === 0) && num > 0) {
                      props.setNumDays(num);
                    } else if (e.target.value === "") {
                      props.setNumDays(0);
                    }
                  }}
                />{" "}
                days
              </span>
            </span>
          </Col>
          <Col style={{ lineHeight: "1.5rem" }}>
            <span
              style={{
                color: props.numDays === 0 ? "gray" : "green",
                cursor: props.numDays > 0 ? "pointer" : "initial",
              }}
              className="fw-bold add-button"
              onClick={() => {
                if (props.numDays > 0) props.continueAction();
              }}
            >
              Continue
            </span>
            <input
              maxLength={1}
              className="invisible underline-input"
              style={{
                width: "1rem",
                display: "inline",
                pointerEvents: "none",
              }}
              aria-label="ignore"
            />
          </Col>
        </Row>
      </Container>
    );
  } else {
    // const daysLeft = Math.round(
    //   DateTime.fromJSDate(props.lockedMode.lastEndDate.toDate()).diff(
    //     DateTime.now(),
    //     ["days"]
    //   ).days
    // );
    return (
      <div style={{ ...props.style }} className={classnames(props.className)}>
        {`On until ${lockedModeEndDateString(props.lockedMode)}`}
      </div>
    );
  }
}

function lockedModeEndDateString(lockedMode: LockedMode): string {
  return DateTime.fromJSDate(lockedMode.lastEndDate.toDate()).toLocaleString(
    DateTime.DATE_SHORT
  );
}
