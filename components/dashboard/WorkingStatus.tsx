import { IconContext } from "react-icons";
import { BsWifi } from "react-icons/bs";
export default function WorkingStatus() {
  return (
    <small
      style={{
        float: "right",
      }}
    >
      You're all set! StopSpend is listening for transactions...
      <IconContext.Provider value={{ size: "1.5em" }}>
        <BsWifi style={{ marginTop: "-0.375em" }} />
      </IconContext.Provider>
    </small>
  );
}
