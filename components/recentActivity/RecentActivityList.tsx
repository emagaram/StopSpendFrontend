import { useState } from "react";
import { Table } from "react-bootstrap";
import { ActivityItemKind } from "shared";
import { ActivityItem } from "../../types";
import ActivityModal from "./ActivityModal/ActivityModal";
import ActivityRow from "./ActivityRow/ActivityRow";

export default function RecentActivityList(props: { items: ActivityItem[] }) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalActivity, setModalActivity] = useState<ActivityItem>();

  return (
    <>
      <Table
        style={{ tableLayout: "fixed" }}
        className="w-100 m-0 recent-activity"
      >
        <tbody>
          {props.items &&
            props.items
              .filter((item) => {
                switch (item.kind) {
                  case ActivityItemKind.alertTextMessage:
                  case ActivityItemKind.greetingsTextMessage:
                  case ActivityItemKind.progressTextMessage:
                  case ActivityItemKind.userAlertTextMessage:
                    return item.contacts.length > 0;
                  case ActivityItemKind.transactionResponse:
                    return true;
                  default:
                    return true;
                }
              })
              .map((item, i) => {
                return (
                  <ActivityRow
                    key={"ar-" + i}
                    openModal={(kind: ActivityItemKind) => {
                      setModalShow(true);
                      setModalActivity(item);
                    }}
                    activity={item}
                  />
                );
              })}
        </tbody>
      </Table>
      <ActivityModal
        key={"am"}
        activity={modalActivity!}
        onClose={() => setModalShow(false)}
        show={modalShow}
      />
    </>
  );
}
