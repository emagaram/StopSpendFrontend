import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaLock } from "react-icons/fa";

export default function ContactInfoButtonLocked(props: {
  name: string;
  phone: string;
}) {
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
        <span
          style={{
            color: "#434343",
          }}
        >
          <span
            style={{
              width: "fit-content",
            }}
          >
            {props.name}
            <FaLock className="ms-2 mb-1 flex-shrink-0" />
          </span>
          <br />
          <small>{props.phone}</small>
        </span>
      </OverlayTrigger>
    </div>
  );
}
