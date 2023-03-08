import classnames from "classnames";
import { DateTime } from "luxon";
import { Stack } from "react-bootstrap";
import { isCategoryName, transformCategoryName } from "shared";
import { Transaction } from "../../../types";
import { amountTransform } from "./ActivityRow";
import { StackedText } from "./SmallActivityRow";
export default function SmallTransactionsActivityRow({
  transaction,
  openModal,
  className,
}: {
  transaction: Transaction;
  openModal: () => void;
  className?: string;
}) {
  const displayDate = DateTime.fromISO(transaction.date)
    .toLocaleString(DateTime.DATETIME_SHORT)
    .split(",")[0]; //since we don't want to include the time
  return (
    <tr
      onClick={openModal}
      className={classnames("align-middle hover-bg p-2", className)}
    >
      <td className="ps-0 pe-2 py-4">
        <Stack className="gap-sm-1" direction="horizontal">
          <StackedText
            topText={
              isCategoryName(transaction.mainCategory)
                ? transformCategoryName(transaction.mainCategory)
                : transaction.mainCategory
            }
            bottomText={transaction.name}
            bottomStyle={{ fontWeight: "600" }}
            bottomClassName="color-primary"
          />
        </Stack>
      </td>
      <td className={classnames("text-end px-0 py-4)")}>
        <StackedText
          topText={transaction.bank + " " + displayDate}
          bottomText={amountTransform(transaction.amount)}
        />
      </td>
    </tr>
  );
}
