import { Timestamp } from "@firebase/firestore";
import classnames from "classnames";
import { DateTime } from "luxon";
import { Stack } from "react-bootstrap";
import { GreetingsTextMessage } from "shared";
import { StackedText } from "./SmallActivityRow";
export default function SmallGreetingsActivityRow(props: {
  activity: GreetingsTextMessage;
  openModal: () => void;
  className?: string;
  timezone?: string;
}) {
  return (
    <tr
      style={{ color: "rgb(33, 37, 41)" }}
      onClick={props.openModal}
      className={classnames("align-middle hover-bg p-2", props.className)}
    >
      <td className="ps-0 pe-2 py-4">
        <Stack className="gap-sm-1" direction="horizontal">
          <StackedText
            topText={DateTime.fromMillis(
              (props.activity.serverTimestamp as Timestamp).toMillis()
            )
              .setZone(props.timezone)
              .toLocaleString(DateTime.DATETIME_SHORT)}
            bottomText={"Greetings Text to  " + props.activity.contacts[0].name}
            bottomStyle={{ fontWeight: "600" }}
            bottomClassName="color-primary"
          />
        </Stack>
      </td>
    </tr>
  );
}
