import { Timestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { UserPublicData } from "shared";
import {
  cancelListenToDashboard,
  listenToDashboard,
} from "../components/dashboard/MySetupAPI";
import { mergeSetInfo } from "../components/myAccount/MyAccountAPI";
import { functions } from "../config/firebase";
import { AppData } from "../types";
import { useDataInitializer } from "../utils/DataInitializer";
import { useAuth } from "./AuthContext";
import { useTime } from "./TimeContext";

const GlobalContext = createContext<
  (AppData & { reload: () => void }) | undefined
>(undefined);
export function useGlobal() {
  const context = React.useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobal must be used within a UseGlobalProvider");
  }
  return context;
}
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const hooks = useDataInitializer();
  const { currentUser, userDocCreated } = useAuth();
  const [outdatedLinkChecked, setOutdatedLinkChecked] = useState(false);
  const now = useTime();
  useEffect(() => {
    if (!hooks.isLoading && !outdatedLinkChecked && currentUser) {
      setOutdatedLinkChecked(true);
      (async () => {
        let promises: Promise<any>[] = [];
        if (hooks.timezone === "") {
          let update: Partial<UserPublicData> = {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          };
          promises.push(mergeSetInfo(update, currentUser.uid));
        }

        // TODO add expiration refresh later, currently tokens basically never expire (150 days)
        if (
          !hooks.inviteInfo ||
          (hooks.inviteInfo.expires as Timestamp).toMillis() < now
        ) {
          promises.push(
            httpsCallable(functions, "invite-getAndSetInviteLink")()
          );
        }
        await Promise.allSettled(promises);
      })();
    }
  }, [currentUser, hooks, outdatedLinkChecked]);

  // TODO use serverTimestamp instead of frontend Date since it might be misconfigured
  // TODO what happens if UserPublic doc is inaccessable? it breaks this

  // IsLoading is true whenever user is logged out OR user is logged in but fetching data for first time
  useEffect(() => {
    //Important that when user signs out, we reset isLoading to true so that when user signs in, we know we need to reload
    if (hooks.isLoading) {
      relistenToUserDoc();
    } else {
      console.log("Hooks already loaded");
    }

    if (!currentUser) {
      console.log("Reset user hooks");
      hooks.setIsLoading(true);
      setOutdatedLinkChecked(false);
    }

    return () => {
      if (hooks.isLoading) return;
      cancelListenToDashboard();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, userDocCreated]);
  //UserDocCreated so we call reload upon signup
  const relistenToUserDoc = () => {
    if (currentUser) {
      listenToDashboard(currentUser.uid, (data: UserPublicData) => {
        console.log("Doc exists!");
        hooks.contactsActions.setList(data.contacts);
        hooks.alertsActions.setList(data.alerts ? data.alerts : []);
        hooks.banksActions.setList(data.banks ? data.banks : []);
        hooks.setLockedMode(data.lockedMode);
        hooks.setTimezone(data.timezone);
        hooks.setFirstName(data.firstName);
        hooks.setPhone(data.phone);
        hooks.setReceiveEmailMarketing(data.receiveEmailMarketing);
        hooks.setContactOnSpending(data.contactOnSpending);
        hooks.setAmountsSpent(data.amountsSpent);
        hooks.setOnboardingStep(data.onboardingStep);
        hooks.setInviteInfo(data.inviteInfo);
        hooks.setIsLoading(false);
      });
    }
  };

  return (
    <GlobalContext.Provider value={{ ...hooks, reload: relistenToUserDoc }}>
      {children}
    </GlobalContext.Provider>
  );
};
