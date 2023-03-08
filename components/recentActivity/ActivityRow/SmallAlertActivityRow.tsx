import { Timestamp } from "@firebase/firestore";
import classnames from "classnames";
import { DateTime } from "luxon";
import { Stack } from "react-bootstrap";
import { AlertTextMessage } from "shared";
import { StackedText } from "./SmallActivityRow";
export default function SmallAlertActivityRow({
  activity,
  openModal,
  className,
  timezone,
}: {
  activity: AlertTextMessage;
  openModal: () => void;
  className?: string;
  timezone?: string;
}) {
  return (
    <tr
      style={{ color: "rgb(33, 37, 41)" }}
      onClick={openModal}
      className={classnames("align-middle hover-bg p-2", className)}
    >
      <td className="ps-0 pe-2 py-4">
        <Stack className="gap-sm-1" direction="horizontal">
          <StackedText
            topText={DateTime.fromMillis(
              (activity.serverTimestamp as Timestamp).toMillis()
            )
              .setZone(timezone)
              .toLocaleString(DateTime.DATETIME_SHORT)}
            bottomText={"Alert Text to Supporters"}
            bottomStyle={{ fontWeight: "600" }}
            bottomClassName="color-primary"
          />
        </Stack>
      </td>
    </tr>
  );
}
