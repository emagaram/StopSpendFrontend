import { formatPhoneNumberIntl } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
type PhoneFormInputProps = {
  phone: string;
};

export default function PhoneFormInputLocked(props: PhoneFormInputProps) {
  return (
    <OverlayTrigger
      key={"phone-locked-overlay"}
      placement={"top"}
      overlay={
        <Tooltip>
          <div style={{ textDecoration: "underline" }}>Locked Mode</div>
          Can't change
        </Tooltip>
      }
    >
      <span
        style={{ color: "gray", background: "#e6e6e6", cursor: "default" }}
        className={"form-control d-flex align-items-center user-select-none "}
      >
        {formatPhoneNumberIntl(props.phone)}
        <FaLock className="ms-auto mb-1 flex-shrink-0" />
      </span>
    </OverlayTrigger>
  );
}
