export default function NameButton(props: {
  name: string | undefined;
  onClick: () => void;
}) {
  return (
    <div
      className="fw-bold clickable hover-bg hover-bg-highlight"
      onClick={props.onClick}
    >
      {props.name === undefined || props.name === "" ? "Add Name" : props.name}
    </div>
  );
}
