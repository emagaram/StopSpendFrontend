import { useState } from "react";
import { Modal } from "react-bootstrap";
import { animated, useSpring } from "react-spring";
import { BanksContent } from "./BanksContent";
import ContactsContent from "./ContactsContent";
import EndContent from "./EndContent";
import { TransactionsContent } from "./TransactionsContent";
import { WelcomeContent } from "./WelcomeContent";
export enum Screen {
  Welcome,
  Transactions,
  Banks,
  Contacts,
  End,
}
function CurrentScreen(props: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  onClose: () => void;
}) {
  switch (props.screen) {
    case Screen.Welcome:
      return (
        <WelcomeContent
          confirmAction={() => props.setScreen(Screen.Transactions)}
        />
      );
    case Screen.Transactions:
      return (
        <TransactionsContent
          confirmAction={() => props.setScreen(Screen.Banks)}
        />
      );
    case Screen.Banks:
      return (
        <BanksContent confirmAction={() => props.setScreen(Screen.Contacts)} />
      );
    case Screen.Contacts:
      return (
        <ContactsContent confirmAction={() => props.setScreen(Screen.End)} />
      );
    case Screen.End:
      return <EndContent confirmAction={props.onClose} />;
  }
}

export default function WelcomeModal(props: {
  show: boolean;
  onClose: () => void;
}) {
  const [screen, setScreen] = useState(Screen.Welcome);
  const styles = useSpring({
    to: [{ opacity: 1 }],
    from: { opacity: 1 },
    config: { duration: 500 },
  });
  return (
    <Modal
      show={props.show}
      // fullscreen={"sm-down"}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="welcome-modal"
    >
      <animated.div style={{ ...styles }}>
        <CurrentScreen
          onClose={props.onClose}
          screen={screen}
          setScreen={setScreen}
        />
      </animated.div>
    </Modal>
  );
}
