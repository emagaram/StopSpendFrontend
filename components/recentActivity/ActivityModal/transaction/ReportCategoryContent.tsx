import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  CategoriesListNames,
  isCategoryName,
  TransactionResponse,
} from "shared";
import CategorySelectList from "../../../dashboard/AlertsList/AlertsFormRow/CategorySelectList";
import { createTransactionCategoryReport } from "../../RecentActivityAPI";
import { Screen } from "./TransactionActivityContentController";

export default function ReportCategoryContent(props: {
  category: string;
  transaction: TransactionResponse;
  setScreen: (s: Screen) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(props.category);
  async function onSubmit() {
    await createTransactionCategoryReport(props.transaction, selected);
    props.setScreen(Screen.ReportCategoryConfirmed);
    // props.onClose();
  }
  return (
    <>
      <Modal.Header className="px-4" closeButton>
        <Button
          variant="back"
          onClick={() => props.setScreen(Screen.Transaction)}
        ></Button>
        <Modal.Title className="ms-auto" id="contained-modal-title-vcenter">
          Report Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="fw-bold">What category should this be in?</div>
        <small className="text-muted mb-4">
          {`Occasionally our system categorizes transactions incorrectly. We'll do our best to make sure this doesn't happen again.`}
          <hr />
        </small>
        <CategorySelectList
          selected={isCategoryName(selected) ? selected : undefined}
          setSelected={setSelected}
          onSubmit={onSubmit}
          categoryListNames={CategoriesListNames}
        />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          onClick={onSubmit}
          size="lg"
          className="w-100 h-100 m-0"
          variant="primary"
          disabled={props.category === selected}
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}
