import React, { useContext, useEffect, useState } from "react";
import { setCanConnectToFirestore } from "../utils/canConnectToFirestore";

const OnlineStatusContext = React.createContext({
  onlineStatus: true,
  setOnlineStatus: (b: boolean) => {},
});

type OnlineStatusProviderProps = {
  children?: React.ReactNode;
};
export const OnlineStatusProvider: React.FC<OnlineStatusProviderProps> = ({
  children,
}) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);
  setCanConnectToFirestore(setOnlineStatus);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnlineStatus(false);
      });
      window.removeEventListener("online", () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={{ onlineStatus, setOnlineStatus }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  if (store === undefined) {
    throw new Error(
      "useOnlineStatus must be used within a UseOnlineStatusProvider"
    );
  }
  return store;
};
