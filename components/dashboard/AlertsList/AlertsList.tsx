import classnames from "classnames";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { Alert, CategoriesAmountSpent } from "shared";
import { useAuth } from "../../../contexts/AuthContext";
import {
  calculateEditStatus as ces,
  shouldAddTempRow as satr,
  unselectRow as ur,
} from "../../../pages/my-setup";
import { AlertsFormData, EditStatus, FormSelectStatus } from "../../../types";
import { canConnectToFirestore } from "../../../utils/canConnectToFirestore";
import useDeviceDetect from "../../../utils/useDeviceDetect";
import {
  addAlert as fbAddAlert,
  editAlert as fbEditAlert,
  removeAlert as fbRemoveAlert,
} from "../MySetupAPI";
import AlertInfoRow from "./AlertInfoRow";
import AlertsFormRow from "./AlertsFormRow/AlertsFormRow";
import createAlertsFormStartingData from "./createAlertsFormStartingData";
type AlertsListProps = {
  alerts: Alert[];
  categoriesAmountSpent: CategoriesAmountSpent;
  editAlert: (c: Alert, n: number) => void;
  removeAlert: (n: number) => void;
  addAlertToBack: (c: Alert) => void;
  lockedMode: boolean;
};

export default function AlertsList(props: AlertsListProps) {
  const { isMobile } = useDeviceDetect();
  const hoverClass = !isMobile ? " hover-bg " : "";

  const [selectedRow, setSelectedRow] = useState(
    FormSelectStatus.NoRowSelected
  );
  const shouldDisabledAddButton =
    selectedRow !== FormSelectStatus.NoRowSelected;
  const disableAddButtonClass = shouldDisabledAddButton ? " disabled " : "";

  function shouldAddTempRow() {
    return satr(selectedRow);
  }
  function unselectRow() {
    ur(setSelectedRow);
  }
  function calculateEditStatus(rowNum: number) {
    return ces(rowNum, selectedRow);
  }

  return (
    <>
      <Stack gap={1}>
        {props.alerts.map((row, j) => (
          <AlertRow
            editStatus={calculateEditStatus(j)}
            key={"alertRow: " + j}
            row={row}
            rowId={j}
            alerts={props.alerts}
            categoriesAmountSpent={props.categoriesAmountSpent}
            removeAlert={props.removeAlert}
            setSelectedRow={setSelectedRow}
            unselectRow={unselectRow}
            lockedMode={props.lockedMode}
            setRow={(a) => props.editAlert(a, j)}
          ></AlertRow>
        ))}
        <AddedRow
          key={"AlertRowAdded"}
          addTempRow={shouldAddTempRow()}
          alerts={props.alerts}
          unselectRow={unselectRow}
          addRow={() =>
            props.addAlertToBack({
              category: "Bank Overdraft Fees",
              spendingLimit: 10,
              timePeriod: "Monthly",
            })
          }
        ></AddedRow>
      </Stack>
      {selectedRow !== -1 && (
        <Row
          className={classnames("py-1 brighten-on-hover " + hoverClass, {
            "d-none d-lg-flex": selectedRow >= 0,
          })}
          style={{
            lineHeight: "2.6rem",
            verticalAlign: "middle",
          }}
          onClick={() => {
            setSelectedRow(FormSelectStatus.FormRowSelected);
          }}
          key={"AlertRowAdder"}
        >
          <Col
            className={"hover-bg-highlight add-button " + disableAddButtonClass}
          >
            +Problem Spending
          </Col>
        </Row>
      )}
    </>
  );
}
const AlertRow = (props: {
  alerts: Alert[];
  row: Alert;
  rowId: number;
  editStatus: EditStatus;
  unselectRow: () => void;
  setSelectedRow: (row: number) => void;
  categoriesAmountSpent: CategoriesAmountSpent;
  removeAlert: (n: number) => void;
  lockedMode?: boolean;
  setRow: (r: Alert) => void;
}) => {
  const { isMobile } = useDeviceDetect();
  const hoverClass = !isMobile ? " hover-bg " : "";
  const { currentUser } = useAuth();
  if (props.editStatus === EditStatus.inEdit) {
    const startingData = createAlertsFormStartingData({
      category: props.row.category,
      spendingLimit: props.row.spendingLimit,
      timePeriod: props.row.timePeriod,
    });
    const copy = [...props.alerts];
    copy.splice(props.rowId, 1);
    return (
      <AlertsFormRow
        otherAlerts={copy}
        formData={startingData}
        confirmAction={async (a: Alert) => {
          if (!(await canConnectToFirestore())) {
            props.unselectRow();
            return;
          }
          props.setRow(a);
          props.unselectRow();
          await fbEditAlert(a, props.rowId, currentUser!.uid, props.alerts);
        }}
        cancelAction={() => props.unselectRow()}
        deleteAction={() => {
          //props.removeAlert(editProps.rowId)
          fbRemoveAlert(props.row, currentUser!.uid);
          props.unselectRow();
        }}
        className="mb-5"
        deletable={true}
        lockedMode={props.lockedMode}
      ></AlertsFormRow>
    );
  } else {
    const disabled = props.editStatus === EditStatus.cantEdit;
    const disableClass = disabled ? " d-none d-md-flex " : "";
    return (
      <AlertInfoRow
        className={disableClass + hoverClass + " py-2"}
        row={props.row}
        disabled={props.editStatus === EditStatus.cantEdit}
        editAlert={() => {
          props.setSelectedRow(props.rowId);
        }}
        alertAmountSpent={props.categoriesAmountSpent[props.row.category]}
        removeAlert={() => {
          props.removeAlert(props.rowId);
          fbRemoveAlert(props.row, currentUser!.uid);
        }}
      />
    );
  }
};

const AddedRow = (props: {
  addTempRow: boolean;
  unselectRow: () => void;
  alerts: Alert[];
  addRow: (a: Alert) => void;
}) => {
  const { currentUser } = useAuth();
  const startingData: AlertsFormData = createAlertsFormStartingData({
    category: undefined,
    spendingLimit: 0,
    timePeriod: "Weekly",
  });

  if (props.addTempRow) {
    return (
      <AlertsFormRow
        otherAlerts={props.alerts}
        formData={startingData}
        confirmAction={async (a: Alert) => {
          if (!(await canConnectToFirestore())) {
            props.unselectRow();
            return;
          }
          props.addRow(a);
          props.unselectRow();
          await fbAddAlert(a, currentUser!.uid);
        }}
        cancelAction={() => {
          props.unselectRow();
        }}
        deletable={false}
      />
    );
  }
  return <></>;
};
