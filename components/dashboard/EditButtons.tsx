import Stack from "react-bootstrap/Stack";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";

export default function EditButtons(props: {
  canClick: boolean;
  editAction: () => void;
  garbageAction: () => void;
}) {
  const color = props.canClick ? "black" : "gray";
  const cursor = props.canClick ? { cursor: "pointer" } : {};
  return (
    <>
      <Stack className="d-none d-md-flex" gap={3} direction="horizontal">
        <FaPen style={cursor} color={color} onClick={props.editAction}></FaPen>

        <FaRegTrashAlt
          style={cursor}
          color={color}
          onClick={props.garbageAction}
        ></FaRegTrashAlt>
      </Stack>
      <Stack className="d-md-none color-primary" gap={4} direction="horizontal">
        <span onClick={props.editAction}>Edit</span>
        <span>Delete</span>
      </Stack>
    </>
  );
}

export function GarbageButton(props: { garbageAction: () => void }) {
  return (
    <FaRegTrashAlt
      className="float-end"
      style={{ cursor: "pointer" }}
      onClick={props.garbageAction}
    ></FaRegTrashAlt>
  );
}
