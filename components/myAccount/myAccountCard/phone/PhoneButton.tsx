import { formatPhoneNumber } from "react-phone-number-input";

export default function PhoneButton(props: {
  phone: string | undefined;
  onClick: () => void;
}) {
  return (
    <div
      className="fw-bold clickable hover-bg hover-bg-highlight"
      onClick={props.onClick}
    >
      {props.phone === undefined || props.phone === ""
        ? "Add Phone"
        : formatPhoneNumber(props.phone)}
    </div>
  );
}
