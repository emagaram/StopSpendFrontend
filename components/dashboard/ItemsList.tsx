import { EditStatus } from "../../types";

export type ItemsListProps<T> = {
  items: T[];
  editItem: (item: T, n: number) => void;
  removeItem: (n: number) => void;
  addItem: (item: T) => void;
  selectedRow: number;
  setSelectedRow: (n: number) => void;
  itemRow: (item: T, rowId: number, editStatus: EditStatus) => JSX.Element;
};

/*
What can be reused across both:
  - AddedRow logic
  - AddedRow
  - Whether to display + button
*/

export default function withAddLogic(props: ItemsListProps<any>) {
  // function shouldAddTempRow() {
  //   if (props.selectedRow === FormSelectStatus.FormRowSelected) {
  //     return true;
  //   }
  //   return false;
  // }
  // function unselectRow() {
  //   props.setSelectedRow(FormSelectStatus.NoRowSelected);
  // }
  // function calculateEditStatus(rowNum: number) {
  //   if (rowNum === props.selectedRow) return EditStatus.inEdit;
  //   else if (props.selectedRow === FormSelectStatus.NoRowSelected)
  //     return EditStatus.canEditButNot;
  //   else return EditStatus.cantEdit;
  // }
}
