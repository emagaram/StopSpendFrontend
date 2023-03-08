import { Form, Stack } from "react-bootstrap";
import "../_checkbox.module.scss";
export default function ListOptions(props: {
  showUnflaggedSpending: boolean;
  setShowUnflaggedSpending: (b: boolean) => void;
  showCheck: boolean;
}) {
  return (
    <Stack
      direction="vertical"
      className="flex-lg-row align-items-lg-end pe-3 mb-2"
    >
      <h4
        className="d-none d-lg-block m-0"
        style={{ color: "gray", fontWeight: "200" }}
      >
        Transactions
      </h4>
      {props.showCheck && (
        <Form.Check
          className="mt-0 ms-lg-auto"
          id={`check-api-checkbox`}
          type={"checkbox"}
        >
          <Form.Check.Input
            type={"checkbox"}
            checked={props.showUnflaggedSpending}
            onChange={(e) => props.setShowUnflaggedSpending(e.target.checked)}
          />
          <Form.Check.Label style={{ userSelect: "none" }}>
            {"Include non-problem spending"}
          </Form.Check.Label>
        </Form.Check>
      )}
    </Stack>
  );
}
// const Checkbox = ({
//   label,
//   value,
//   onChange,
// }: {
//   label: string
//   value: boolean
//   onChange: ChangeEventHandler<HTMLInputElement>
// }) => {
//   return (
//     <label
//       style={{ cursor: "pointer", color: "white" }}
//       className="d-flex align-items-center user-select-none"
//     >
//       <input
//         style={{ cursor: "pointer", marginRight: "2px" }}
//         type="checkbox"
//         className="checkbox options "
//         checked={value}
//         onChange={onChange}
//       />
//       {label}
//     </label>
//   )
// }
