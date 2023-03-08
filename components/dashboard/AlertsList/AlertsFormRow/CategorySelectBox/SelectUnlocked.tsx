import { FaPen } from "react-icons/fa";
import { CategoryName, transformCategoryName } from "shared";

export default function SelectUnlocked(props: {
  onClick: () => void;
  category: CategoryName | undefined;
}) {
  return (
    <div
      className="form-control d-flex align-items-center"
      style={{
        cursor: "pointer",
        zIndex: "100",
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          color: props.category === undefined ? "gray" : "black",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {props.category !== undefined && transformCategoryName(props.category)}
        {props.category === undefined && "None"}
      </div>
      <FaPen className="ms-auto flex-shrink-0" />
    </div>
  );
}
