import { Timestamp } from "@firebase/firestore";
import classnames from "classnames";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { TextMessage } from "shared";
import { useAuth } from "../../../contexts/AuthContext";
import { useTime } from "../../../contexts/TimeContext";
import { AppData } from "../../../types";
import AlertsList from "../AlertsList/AlertsList";
import BanksList from "../BanksList/BanksList";
import ContactsList from "../ContactsList/ContactsList";
import { updateOnboarding } from "../MySetupAPI";
import SetupProgress from "../SetupProgress/SetupProgress";
import WelcomeModal from "../WelcomeModal/WelcomeModal";
import Subcard from "./Subcard";
export default function MySetupCard(
  props: AppData & {
    setMessages: React.Dispatch<React.SetStateAction<TextMessage[]>>;
  }
) {
  const { currentUser } = useAuth();
  const [setupDisplayed, setSetupDisplayed] = useState(
    props.banks.length === 0 ||
      props.alerts.length === 0 ||
      props.contacts.length === 0
  );
  const now = useTime();
  const [showWelcome, setShowWelcome] = useState(!props.onboardingStep);
  const isLocked =
    props.lockedMode?.lastEndDate !== undefined &&
    props.lockedMode?.lastEndDate.toMillis() > now
      ? true
      : false;

  return (
    <div>
      {!props.isLoading && (
        <>
          <WelcomeModal
            show={showWelcome}
            onClose={() => {
              setShowWelcome(false);
              if (currentUser) {
                updateOnboarding("seenWelcomeModal", currentUser.uid).catch();
              }
            }}
          />
          <div
            className={classnames("ss-card-label ps-3 ps-lg-0", {
              "mb-2": setupDisplayed,
            })}
          >
            My Setup
          </div>
          {setupDisplayed && (
            <SetupProgress
              banksAdded={props.banks.length > 0}
              contactsAdded={props.contacts.length > 0}
              transactionsToAvoidAdded={props.alerts.length > 0}
              exit={() => {
                setSetupDisplayed(false);
              }}
            ></SetupProgress>
          )}
          <div
            style={
              setupDisplayed
                ? {
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderTop: 0,
                  }
                : {}
            }
            className="ss-card"
          >
            {/* <Card.Title className="mb-2 fw-bold">My Setup</Card.Title> */}
            <Stack gap={2}>
              <div>
                <Subcard
                  className="pt-0"
                  title={"Problem Spending"}
                  subTitle="Areas of spending that you want to control."
                >
                  <AlertsList
                    lockedMode={isLocked}
                    alerts={props.alerts}
                    categoriesAmountSpent={props.amountsSpent}
                    addAlertToBack={props.alertsActions.addToListBack}
                    editAlert={props.alertsActions.editListItem}
                    removeAlert={props.alertsActions.removeFromList}
                  />
                </Subcard>
                <hr className="m-s1" />
              </div>

              <div>
                <Subcard
                  title="Banks"
                  subTitle="Connect banks to track spending."
                >
                  <BanksList
                    banks={props.banks}
                    addBankToFront={props.banksActions.addToListBack}
                    lockedMode={isLocked}
                  />
                </Subcard>
                <hr className="m-s1" />
              </div>
              <div>
                <Subcard
                  title={"Supporters"}
                  subTitle="Caring friends and family who are there for you. They'll be texted whenever you break your limits or make progress on your goals."
                >
                  <ContactsList
                    firstName={props.firstName}
                    contacts={props.contacts}
                    lockedMode={isLocked}
                    editContact={props.contactsActions.editListItem}
                    removeContact={props.contactsActions.removeFromList}
                    addContactToBack={props.contactsActions.addToListFront}
                    setMessages={props.setMessages}
                    inviteString={props.inviteInfo?.inviteString || ""}
                  ></ContactsList>
                </Subcard>
              </div>
            </Stack>
          </div>
        </>
      )}
    </div>
  );
}
