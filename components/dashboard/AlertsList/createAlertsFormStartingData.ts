import { CategoryName, TimePeriod } from "shared";
import { AlertsFormData, sameInitialFormFieldData } from "../../../types";
export default function createAlertsFormStartingData(props: {
  category: CategoryName | undefined;
  spendingLimit: number;
  timePeriod: TimePeriod;
}): AlertsFormData {
  return {
    category: {
      value: props.category,
      ...sameInitialFormFieldData,
    },
    spendingLimit: {
      value: props.spendingLimit,
      ...sameInitialFormFieldData,
    },
    timePeriod: {
      value: props.timePeriod,
      ...sameInitialFormFieldData,
    },
    canSubmit: false,
    fieldEdited: false,
  };
}
