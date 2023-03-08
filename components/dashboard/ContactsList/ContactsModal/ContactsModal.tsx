import { doc, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import { TextMessage, UserPublicData } from "shared";
import { db } from "../../../../config/firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import createBasicConverter from "../../../../converters/createBasicConverter";
import useDeviceDetect from "../../../../utils/useDeviceDetect";
import AddPhoneContent from "./AddPhoneContent";
import EndContent from "./EndContent";
import YourNameContent from "./YourNameContent";
export enum Screen {
  YourName,
  LikeToBeNotified,
  End,
}

type ContactsModalProps = {
  currentName: string;
  firstTime: boolean;
  show: boolean;
  closeModal: () => void;
  setMessages: React.Dispatch<React.SetStateAction<TextMessage[]>>;
  inviteString: string;
};
export default function ContactsModal(props: ContactsModalProps) {
  const startScreen: Screen = props.firstTime ? Screen.YourName : Screen.End;
  const [screen, setScreen] = useState<Screen>(startScreen);
  const [showToast, setShowToast] = useState(false);
  const { isMobile } = useDeviceDetect();

  function reset() {
    setScreen(props.firstTime ? Screen.YourName : Screen.End);
  }
  useEffect(() => {
    if (props.show) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let promises: Promise<any>[] = [];

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.closeModal();
        if (isMobile) {
          reset();
        }
      }}
      animation={!isMobile}
      centered
      onExited={reset}
    >
      <div style={{ minHeight: "25em" }}>
        <CurrentScreen
          {...props}
          promises={promises}
          screen={screen}
          setScreen={setScreen}
          setShowToast={setShowToast}
        />
      </div>
      <div aria-live="polite" aria-atomic="true">
        <ToastContainer className="p-3" position={"bottom-center"}>
          <Toast
            show={showToast}
            delay={2300}
            autohide
            onClose={() => setShowToast(false)}
          >
            <Toast.Header closeButton={false}>
              <strong>Link copied</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>
    </Modal>
  );
}

function CurrentScreen(
  props: {
    screen: Screen;
    setScreen: (s: Screen) => void;
    promises: Promise<any>[];
    setShowToast: (b: boolean) => void;
  } & ContactsModalProps
) {
  const [userName, setUserName] = useState<string>(props.currentName);
  const { currentUser } = useAuth()!;

  const confirmAction = async (userName: string, phone: string | undefined) => {
    try {
      const docRef = doc(db, "UserPublic", currentUser!.uid).withConverter(
        createBasicConverter<UserPublicData>()
      );
      return await updateDoc(docRef, {
        firstName: userName,
        ...(phone
          ? {
              phone: phone,
              contactOnSpending: true,
            }
          : {}),
      });
    } catch (error) {
      console.log(error);
    }
  };

  switch (props.screen) {
    case Screen.YourName:
      return (
        <YourNameContent
          onSubmit={(userName: string) => {
            setUserName(userName);
            props.setScreen(Screen.LikeToBeNotified);
          }}
          onClose={props.closeModal}
        />
      );
    case Screen.LikeToBeNotified:
      return (
        <AddPhoneContent
          userName={userName}
          onSubmit={async (phone: string) => {
            await confirmAction(userName, phone);
            props.setScreen(Screen.End);
          }}
          onSkip={async () => {
            await confirmAction(userName, undefined);
            props.setScreen(Screen.End);
          }}
          onBack={() => props.setScreen(Screen.YourName)}
        />
      );
    case Screen.End:
      return (
        <EndContent
          inviteString={props.inviteString}
          onClose={props.closeModal}
          openToast={() => props.setShowToast(true)}
        />
      );
  }
}
