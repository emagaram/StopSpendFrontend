import * as React from "react";
import { UserSettings } from "shared";
import { useGlobal } from "./GlobalContext";

// type Action = { type: "increment" } | { type: "decrement" };
// type Dispatch = (action: Action) => void;
// type State = { count: number };
type UserSettingsProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<UserSettings | undefined>(
  undefined
);

// function countReducer(state: State, action: Action) {
//   switch (action.type) {
//     case 'increment': {
//       return {count: state.count + 1}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

function UserSettingsProvider({ children }: UserSettingsProviderProps) {
  // const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  // const value = {state, dispatch}
  const global = useGlobal();
  return (
    <UserStateContext.Provider value={global}>
      {children}
    </UserStateContext.Provider>
  );
}

function useUserSettings() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error(
      "useUserSettings must be used within a UserSettingsProvider"
    );
  }
  return context;
}

export { UserSettingsProvider, useUserSettings };
