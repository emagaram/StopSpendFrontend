import { IconContext } from "react-icons";
import { BsXLg } from "react-icons/bs";
import Checklist from "./Checklist";
import ProgressPie from "./ProgressPie";
type SetupProgressProps = {
  contactsAdded: boolean;
  transactionsToAvoidAdded: boolean;
  banksAdded: boolean;
  exit: () => void;
};

export default function SetupProgress(props: SetupProgressProps) {
  return (
    <div
      style={{
        background: "#eaeaea",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        borderTopRightRadius: "0.438em",
        borderTopLeftRadius: "0.438em",
        marginBottom: "-1px",
        zIndex: "-1",
      }}
      className="ss-card"
    >
      <span className="fw-bold fs-4">Setup Progress</span>
      <IconContext.Provider
        value={{ size: "1.2em", style: { cursor: "pointer", float: "right" } }}
      >
        <BsXLg onClick={props.exit}></BsXLg>
      </IconContext.Provider>

      <div className="d-flex gap-5 justify-content-lg-center my-3">
        <Checklist {...props} />

        <div
          className="d-none d-lg-flex justify-content-center"
          style={{
            width: "4.688em",
            minWidth: "4.688em",
          }}
        >
          <ProgressPie
            percentage={
              (props.contactsAdded ? 33 : 0) +
              (props.banksAdded ? 33 : 0) +
              (props.transactionsToAvoidAdded ? 33 : 0)
            }
          />
        </div>
      </div>
    </div>
  );
}
