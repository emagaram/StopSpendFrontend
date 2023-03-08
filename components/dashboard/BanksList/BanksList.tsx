import { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { BankItem } from "shared";
import { useAuth } from "../../../contexts/AuthContext";
import {
  calculateEditStatus as ces,
  unselectRow as ur,
} from "../../../pages/my-setup";
import { EditStatus, FormSelectStatus } from "../../../types";
import {
  exchangeLinkToken,
  getLinkToken,
  removeBank,
  updateBank,
} from "../MySetupAPI";
import BankInfoRow from "./BankInfoRow/BankInfoRow";
import BanksFormRow from "./BanksFormRow";
type BanksListProps = {
  banks: BankItem[];
  addBankToFront: (b: BankItem) => void;
  lockedMode: boolean;
};

export default function BanksList(props: BanksListProps) {
  const [token, setToken] = useState<string>();
  const [selectedRow, setSelectedRow] = useState(
    FormSelectStatus.NoRowSelected
  );

  const shouldDisabledAddButton =
    selectedRow !== FormSelectStatus.NoRowSelected;
  const disableAddButtonClass = shouldDisabledAddButton ? " disabled " : "";
  const { currentUser } = useAuth();

  useEffect(() => {
    let isSubscribed = true;
    //Keeps printing multiple times, making multiple sendLinkToken calls. Must fix!
    (async () => {
      const res = await getLinkToken(undefined);
      if (isSubscribed) {
        setToken(res);
      }
    })();
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken, metadata) => {
      try {
        // send public_token to your server
        // https://plaid.com/docs/api/tokens/#token-exchange-flow
        const id = metadata?.institution?.institution_id
          ? metadata?.institution?.institution_id
          : "no_id";
        const name = metadata.institution?.name
          ? metadata.institution?.name
          : "Unnamed Institution";
        props.addBankToFront({
          name: name,
          institution_id: id,
          accountNames: metadata.accounts.map((acc) => acc.name),
          item_id: "",
        });
        await exchangeLinkToken({
          accountNames: metadata.accounts.map((a) => a.name),
          institutionId: id,
          institutionName: name,
          publicToken: publicToken,
        });
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);

  const config: PlaidLinkOptions = {
    token: token || "",
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    // ready,
    // error,
    // exit
  } = usePlaidLink(config);

  function unselectRow() {
    ur(setSelectedRow);
  }
  function calculateEditStatus(rowNum: number) {
    return ces(rowNum, selectedRow);
  }
  const BankRow = (editProps: {
    row: BankItem;
    rowId: number;
    editStatus: EditStatus;
  }) => {
    if (editProps.editStatus === EditStatus.inEdit) {
      return (
        <BanksFormRow
          bank={editProps.row}
          cancelAction={() => unselectRow()}
          deleteAction={async () => {
            removeBank(props.banks, editProps.row, currentUser!.uid);
            unselectRow();
          }}
          updateAction={async (bank: BankItem) => {
            await updateBank(bank, props.banks);
          }}
        ></BanksFormRow>
      );
    } else {
      return (
        <BankInfoRow
          lockedMode={props.lockedMode}
          bank={editProps.row}
          selectRow={() => setSelectedRow(editProps.rowId)}
        />
      );
    }
  };

  return (
    <>
      {props.banks.length > 0 && (
        <Stack gap={0}>
          {props.banks.map((row, j) => (
            <BankRow
              key={"bank row: " + j}
              row={row}
              rowId={j}
              editStatus={calculateEditStatus(j)}
            ></BankRow>
          ))}
        </Stack>
      )}
      <Row className="clickable py-2 hover-bg" onClick={() => open()}>
        <Col
          className={"hover-bg-highlight add-button" + disableAddButtonClass}
        >
          +Bank
        </Col>
      </Row>
    </>
  );
}
