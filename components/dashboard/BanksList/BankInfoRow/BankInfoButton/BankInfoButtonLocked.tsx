import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { BankItem } from "shared";
export default function BankInfoButtonLocked(props: { bank: BankItem }) {
  return (
    <div className="user-select-none">
      <OverlayTrigger
        key={"category-select-overlay"}
        placement={"right"}
        overlay={
          <Tooltip>
            <div style={{ textDecoration: "underline" }}>Locked Mode</div>
            Can't change
          </Tooltip>
        }
      >
        <span style={{ color: "#434343" }}>
          {props.bank.name}
          <FaLock className="ms-1 mb-1 flex-shrink-0" />
        </span>
      </OverlayTrigger>
      <small className="d-flex align-items-center" style={{ color: "gray" }}>
        {props.bank.accountNames.map(
          (name, i) =>
            name + (i !== props.bank.accountNames.length - 1 ? ", " : "")
        )}
      </small>
    </div>
  );
}
