import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { CategoryName, transformCategoryName } from "shared";

export default function SelectLocked(props: { category: CategoryName }) {
  return (
    <OverlayTrigger
      key={"category-select-overlay"}
      placement={"top"}
      overlay={
        <Tooltip>
          <div style={{ textDecoration: "underline" }}>Locked Mode</div>
          Can't change
        </Tooltip>
      }
    >
      <div
        className="form-control d-flex align-items-center"
        style={{
          zIndex: "100",
          background: "#e6e6e6",
          cursor: "default",
        }}
      >
        <div
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "grey",
          }}
          className="me-1"
        >
          {transformCategoryName(props.category)}
        </div>
        <FaLock style={{ color: "grey" }} className="ms-auto flex-shrink-0" />
      </div>
    </OverlayTrigger>
  );
}
