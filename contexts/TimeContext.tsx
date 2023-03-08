import React, { createContext, ReactNode, useEffect, useState } from "react";
import createFirebaseFunction from "../utils/createFirebaseFunction";
import { useLocalStorage } from "../utils/useLocalStorage";
const TimeContext = createContext<((localTime: number) => number) | undefined>(
  undefined
);
export function useTime() {
  const context = React.useContext(TimeContext);

  if (context === undefined) {
    throw new Error("useTime must be used within a UseTimeContext Provider");
  }
  return context(Date.now());
}
export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [gap, setGap] = useLocalStorage("timeGap", 0);

  useEffect(() => {
    (async () => {
      // const response = await createFirebaseFunction<void, number>(
      //   "currentTime"
      // )();
      // console.log("Server: " + response);
      // console.log("Local:" + Date.now());
      const currGap = Date.now() + 500 - Date.now();
      // console.log("Time gap:" + currGap);
      setGap(currGap);
    })();
  }, []);

  const getTime = (dateNow: number) => {
    return dateNow + gap;
  };

  return (
    <TimeContext.Provider value={getTime}>{children}</TimeContext.Provider>
  );
};
