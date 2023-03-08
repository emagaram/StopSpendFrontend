import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsArrowRepeat, BsX } from "react-icons/bs";
import {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Bank, BankItem } from "shared";
import LoadingButton from "../../shared/LoadingButton";
import { getLinkToken, updateBank } from "../MySetupAPI";
type BanksFormRowProps = {
  bank: BankItem;
  updateAction: (b: BankItem) => Promise<void>;
  deleteAction: () => Promise<void>;
  cancelAction: () => void;
};
export default function BanksFormRow(props: BanksFormRowProps) {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isSubscribed = true;
    // Keeps printing multiple times, making multiple sendLinkToken calls. Must fix!
    // Bank id could equal "" if it has been temporarily added out of assumption during connection
    if (!token && props.bank.item_id != "") {
      getLinkToken({
        item_id: props.bank.item_id,
      }).then((res) => {
        if (isSubscribed) {
          setToken(res);
          setLoading(false);
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken, metadata) => {
      try {
        // We know we are dealing with an existing bank
        // if (props.bank.item_id != "") {
        await props.updateAction({
          item_id: props.bank.item_id,
          status: "HEALTHY",
          institution_id: props.bank.institution_id,
          accountNames: metadata.accounts.map(acc => acc.name),
          name: metadata.institution?.name || props.bank.name
        })
        // }
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
  return (
    <>
      <Row className="py-2 align-items-center user-select-none">
        <Col>
          <div
            onClick={props.cancelAction}
            style={{ width: "fit-content", cursor: "pointer" }}
            className="fw-bold text-nowrap"
          >
            {props.bank.name}
          </div>
        </Col>
      </Row>
      <Row className="g-2 mb-2">
        <Col xs={12} sm={"auto"}>
          <LoadingButton
            loading={loading}
            className="w-100 d-flex justify-content-center align-items-center"
            onClick={() => open()}
          >
            Update
            {loading && <div style={{ width: "3px" }}></div>}
            {!loading && <BsArrowRepeat style={{ paddingLeft: "2px" }} />}
          </LoadingButton>
        </Col>
        <Col xs={6} sm={"auto"}>
          <Button
            className="w-100"
            variant="outline-primary"
            onClick={props.cancelAction}
          >
            Cancel
            <BsX />
          </Button>
        </Col>
        <Col xs={6} sm={"auto"} className="ms-sm-auto">
          <Button
            className="w-100"
            variant="outline-danger"
            onClick={async () => {
              await props.deleteAction();
            }}
          >
            Delete
          </Button>
        </Col>
        {/* <Col xs={"auto"^}>
          <Button
            className="me-1"
            variant="outline-primary"
            onClick={props.cancelAction}
          >
            Cancel
            <BsX />
          </Button>

          <LoadingButton
            variant="outline-danger"
            onClick={async () => {
              setLoading(true);
              await props.deleteAction();
            }}
            loading={loading}
          >
            Delete
          </LoadingButton>
        </Col> */}
      </Row>
    </>
  );
}
/**
 *
 */
