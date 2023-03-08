import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { SpendingLimitControlProps } from "./SpendingLimitControl";
export default function ControlLocked(props: SpendingLimitControlProps) {
  return (
    <OverlayTrigger
      key={"spendingLimit-overlay"}
      placement={"top"}
      overlay={
        <Tooltip>
          <div style={{ textDecoration: "underline" }}>Locked Mode</div>
          Spending limit must be equal to or under ${props.spendingLimit}
        </Tooltip>
      }
    >
      <InputGroup className="flex-nowrap">
        <Form.Control
          value={"$" + props.form.spendingLimit.value}
          maxLength={7}
          onBlur={() => {
            props.dispatch({ kind: "blurSpendingLimit" });
          }}
          onChange={(e) => {
            let num = e.target.value.replace("$", "");
            if ((parseInt(num) || parseInt(num) === 0) && parseInt(num) >= 0) {
              props.dispatch({
                kind: "editLimitAmount",
                proposedValue: Math.min(parseInt(num), props.spendingLimit!),
              });
            } else if (num === "") {
              props.dispatch({
                kind: "editLimitAmount",
                proposedValue: 0,
              });
            }
          }}
        ></Form.Control>

        <InputGroup.Text
          style={{ color: "gray", background: "#e6e6e6", cursor: "default" }}
        >
          <span className="me-1">{props.form.timePeriod.value}</span>
          <FaLock className="ms-auto flex-shrink-0" />
        </InputGroup.Text>
      </InputGroup>
    </OverlayTrigger>
  );
}
