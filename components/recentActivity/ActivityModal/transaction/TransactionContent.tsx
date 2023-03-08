import classnames from "classnames";
import { Modal, Stack } from "react-bootstrap";
import { isCategoryName, transformCategoryName } from "shared";
import { Transaction } from "../../../../types";
import { amountTransform } from "../../ActivityRow/ActivityRow";
import { Screen } from "./TransactionActivityContentController";

// TODO: Alert icon next to view message sent
export default function TransactionContent(props: {
  transaction: Transaction;
  setScreen: (s: Screen) => void;
}) {
  const sign = props.transaction.amount > 0 ? "-" : "+";
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          {props.transaction.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3} style={{ lineHeight: "1.875rem" }}>
          <div>
            <div>
              <span
                style={{
                  color: sign === "+" ? "green" : "black",
                }}
                className={classnames("fs-5")}
              >
                {amountTransform(props.transaction.amount)}
              </span>
              {props.transaction.pending && (
                <span className="text-muted"> Pending</span>
              )}
            </div>
            {/* <div
              className="fw-bold hover-bg"
              style={{ color: "red" }}
              onClick={() => props.setScreen(Screen.MessageSent)}
            >
              View message sent
            </div> */}
          </div>
          <div>
            <div>{`Category: ${
              isCategoryName(props.transaction.mainCategory)
                ? transformCategoryName(props.transaction.mainCategory)
                : props.transaction.mainCategory
            }`}</div>
            <div>{`Bank: ${props.transaction.bank}`}</div>
            <div>{`Date: ${props.transaction.date}`}</div>
          </div>
          <div className="hover-bg" style={{ color: "red" }}>
            <div onClick={() => props.setScreen(Screen.ReportCategory)}>
              Report category
            </div>
            <div onClick={() => props.setScreen(Screen.ReportOther)}>
              Report other issue
            </div>
          </div>
        </Stack>
      </Modal.Body>
    </>
  );
}
