import useDeviceDetect from "../../../../utils/useDeviceDetect";

export default function ContactInfoButtonUnlocked(props: {
  name: string;
  phone: string;
  disabled: boolean;
  editAction: () => void;
}) {
  const { isMobile } = useDeviceDetect();

  return (
    <div
      style={{
        cursor: "pointer",
        width: "fit-content",
      }}
      onClick={isMobile ? props.editAction : () => {}}
    >
      <div
        onClick={props.editAction}
        className={
          "clickable hover-bg-highlight" + (props.disabled ? " disabled " : " ")
        }
      >
        {props.name}
      </div>
      <small
        onClick={props.editAction}
        className={props.disabled ? " disabled" : " subtext "}
      >
        {props.phone}
      </small>
    </div>
  );
}
