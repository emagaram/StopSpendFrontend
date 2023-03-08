import { Button, Form, InputGroup } from "react-bootstrap";
import { SpendingLimitControlProps } from "./SpendingLimitControl";

export default function ControlUnlocked(props: SpendingLimitControlProps) {
  const handleClick = () => {
    if (props.form.timePeriod.value === "Weekly") {
      props.dispatch({ kind: "editTimePeriod", proposedValue: "Monthly" });
      return;
    }
    props.dispatch({ kind: "editTimePeriod", proposedValue: "Weekly" });
  };

  return (
    <InputGroup className="flex-nowrap">
      <Form.Control
        value={"$" + props.form.spendingLimit.value}
        maxLength={7}
        pattern="\d*"
        onBlur={() => {
          props.dispatch({ kind: "blurSpendingLimit" });
        }}
        onChange={(e) => {
          let num = e.target.value.replace("$", "");
          if ((parseInt(num) || parseInt(num) === 0) && parseInt(num) >= 0) {
            props.dispatch({
              kind: "editLimitAmount",
              proposedValue: parseInt(num),
            });
          } else if (num === "") {
            props.dispatch({
              kind: "editLimitAmount",
              proposedValue: 0,
            });
          }
        }}
      ></Form.Control>
      <Button
        variant="outline-custom-gray"
        disabled={props.form.spendingLimit.value === 0}
        onClick={handleClick}
      >
        {props.form.spendingLimit.value === 0
          ? "Weekly"
          : props.form.timePeriod.value}
      </Button>
    </InputGroup>
  );
}
