import Head from "next/head";
import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import { TextMessage } from "shared";
import LockedCard from "../components/dashboard/LockedCard/LockedCard";
import MySetupCard from "../components/dashboard/mySetupCard/MySetupCard";
import RecentMessagesCard from "../components/dashboard/RecentMessagesCard";
import Loading from "../components/invite/Loading";
import NavigationApp from "../components/navigation/NavigationApp";
import WithPrivateRoute from "../components/navigation/WithPrivateRoute";
import { useGlobal } from "../contexts/GlobalContext";
import { AppData, EditStatus, FormSelectStatus } from "../types";
import usePreloadImages from "../utils/usePreloadImages";
export type DashboardProps = AppData;

export function shouldAddTempRow(selectedRow: number) {
  if (selectedRow === FormSelectStatus.FormRowSelected) return true;
  return false;
}

//Seems like bad practice
export function unselectRow(setSelectedRow: (n: number) => void) {
  setSelectedRow(FormSelectStatus.NoRowSelected);
}

export function calculateEditStatus(rowNum: number, selectedRow: number) {
  if (rowNum === selectedRow) return EditStatus.inEdit;
  else if (selectedRow === FormSelectStatus.NoRowSelected)
    return EditStatus.canEditButNot;
  else return EditStatus.cantEdit;
}

//Maybe not remounting...
export default function DashboardPage() {
  const [messages, setMessages] = useState<TextMessage[]>([]);
  const hooks = useGlobal();
  usePreloadImages([
    "/whoAmI.png",
    "/friendContact.png",
    "/standingNextToPhone.png",
  ]);

  return (
    <WithPrivateRoute>
      <NavigationApp />
      <Head>
        <title>StopSpend - My Setup</title>
      </Head>
      {hooks.isLoading && <Loading />}
      {!hooks.isLoading && (
        <Container
          className="below-navbar-app px-4"
          style={{ overflowX: "hidden", marginBottom: "12.5em" }}
        >
          <Row xs={1} lg={2} className="g-5">
            <Col>
              <MySetupCard {...hooks} setMessages={setMessages} />
            </Col>
            <Col>
              <Stack gap={5}>
                <LockedCard lockedMode={hooks.lockedMode}></LockedCard>
                <RecentMessagesCard
                  messages={messages}
                  setMessages={setMessages}
                />
              </Stack>
            </Col>
          </Row>
        </Container>
      )}
    </WithPrivateRoute>
  );
}
