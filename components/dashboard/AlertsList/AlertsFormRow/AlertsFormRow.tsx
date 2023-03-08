import { AlertsFormData, AlertFormAction } from "../../../../types";
import { useEffect, useReducer, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { CategoryName, Alert } from "shared";
import CategorySelectBox from "./CategorySelectBox/CategorySelectBox";
import SpendingLimitControl from "./SpendingLimit/SpendingLimitControl";
import ConfirmButtons from "../../ConfirmButtons";
type AlertsFormRowProps = {
  otherAlerts: Alert[];
  formData: AlertsFormData;
  cancelAction: () => void;
  confirmAction: (a: Alert) => Promise<void>;
  deleteAction?: () => void;
  deletable: boolean;
  className?: string;
  lockedMode?: boolean;
};

export default function AlertsFormRow(props: AlertsFormRowProps) {
  const processFormAction = (
    form: AlertsFormData,
    formAction: AlertFormAction
  ): AlertsFormData => {
    let result = { ...form };
    switch (formAction.kind) {
      case "editCategory": {
        result.category = {
          ...result.category,
          value: formAction.proposedValue,
          beenEdited: true,
        };
        result.fieldEdited = true;
        break;
      }
      case "editLimitAmount": {
        result.spendingLimit = {
          ...result.spendingLimit,
          value: formAction.proposedValue,
          beenEdited: true,
        };
        result.fieldEdited = true;

        // Old bad version for reference, manipulated the props object
        // result.spendingLimit.value = formAction.proposedValue
        // result.spendingLimit.beenEdited = true
        // result.fieldEdited = true
        break;
      }
      case "editTimePeriod": {
        result.timePeriod = {
          ...result.timePeriod,
          value: formAction.proposedValue,
          beenEdited: true,
        };
        result.fieldEdited = true;
        break;
      }
      case "blurCategory": {
        if (result.category.beenEdited) {
          result.category = {
            ...result.category,
            hasBlurred: true,
          };
        }
        break;
      }
      case "blurSpendingLimit": {
        if (result.spendingLimit.beenEdited) {
          result.spendingLimit = {
            ...result.spendingLimit,
            hasBlurred: true,
          };
        }
        break;
      }
    }
    return processFormEffects(result);
  };

  const processFormEffects = (form: AlertsFormData): AlertsFormData => {
    let result = { ...form };

    if (result.category.hasBlurred && result.category.value === undefined) {
      result.category.error = "Please enter a category.";
    } else {
      result.category.error = "";
    }

    if (result.category.value !== undefined) {
      result.canSubmit = true;
    }

    if (
      form.spendingLimit.value === undefined ||
      props.formData.spendingLimit.value === undefined
    ) {
      return result;
    }
    if (
      form.spendingLimit.value > props.formData.spendingLimit.value &&
      props.lockedMode
    ) {
      result.canSubmit = false;
    }

    return result;
  };
  const copy = { ...props.formData };
  const [form, dispatch] = useReducer(
    processFormAction,
    processFormEffects(copy)
  );

  const [canI, setCanI] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCanI(true);
    }, 10);
  }, []);
  return (
    <>
      <Row style={{ zIndex: "10" }} className={"gx-2 gy-3"}>
        <Col xs={12} sm={6} className="position-relative">
          <Form.Text>Category*</Form.Text>
          <CategorySelectBox
            setSelected={(value: CategoryName) => {
              dispatch({ kind: "editCategory", proposedValue: value });
            }}
            category={form.category.value}
            lockedMode={props.lockedMode}
            alreadySelected={props.otherAlerts.map((alert) => alert.category)}
          />
        </Col>
        <Col
          xs={12}
          style={{ zIndex: "0" }}
          sm
          className="position-relative mt-3 mt-sm-auto"
        >
          <Form.Text>Spending Limit</Form.Text>
          <SpendingLimitControl
            spendingLimit={props.formData.spendingLimit.value}
            dispatch={dispatch}
            form={form}
            lockedMode={props.lockedMode}
          />
        </Col>
      </Row>
      <Row style={{ pointerEvents: canI ? "auto" : "none" }} className="my-2">
        <Col xs={12}>
          <ConfirmButtons
            loadingConfirm={loadingConfirm}
            cancelAction={props.cancelAction}
            canSubmit={form.canSubmit}
            confirmAction={async () => {
              //will never be undefined do to canSubmit check
              setLoadingConfirm(true);
              await props.confirmAction({
                category: form.category.value!,
                spendingLimit: form.spendingLimit.value!,
                timePeriod:
                  form.spendingLimit.value! > 0
                    ? form.timePeriod.value!
                    : "Weekly", //$0 limits have weekly reset
              });
            }}
            deleteAction={props.deleteAction}
            deletable={props.deletable}
            lockedMode={props.lockedMode}
          />
        </Col>
      </Row>
    </>
  );
}
