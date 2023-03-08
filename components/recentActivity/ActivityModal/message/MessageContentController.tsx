import { useState } from "react";
import { TextMessage } from "shared";
import MessageContent from "./MessageModal";
export enum Screen {
  ReportIssue,
  MessageSent,
}
export default function MessageActivityContentController(props: {
  onClose: () => void;
  activity: TextMessage;
}) {
  const [screen, setScreen] = useState<Screen>(Screen.MessageSent);

  const CurrentScreen = () => {
    switch (screen) {
      case Screen.MessageSent:
        return (
          <MessageContent
            contacts={props.activity.contacts}
            message={props.activity.message}
            setScreen={setScreen}
          />
        );
      case Screen.ReportIssue:
        return <></>;
    }
  };

  return <CurrentScreen />;
}
