import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithPopup,
  linkWithRedirect,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  unlink,
  updatePassword as fbUpdatePassword,
  User,
  UserCredential,
} from "firebase/auth";
import { DateTime } from "luxon";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createUserDocIfFirst } from "../components/dashboard/MySetupAPI";
import { auth } from "../config/firebase";
import { AppData } from "../types";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
type AuthContextType = {
  currentUser: User | null;
  userDocCreated: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signupWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signinWithGoogle: (isMobile: boolean) => Promise<UserCredential>;
  linkWithGoogle: (isMobile: boolean) => Promise<void>;
  unlinkProvider: (u: User, s: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  loading: boolean;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UseAuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children?: ReactNode;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("email");
  googleProvider.addScope("profile");
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookies, setCookie] = useCookies(["isLoggedIn"]);
  function onCookieChange(newName: boolean) {
    setCookie("isLoggedIn", newName, {
      path: "/",
      expires: DateTime.now()
        .plus({
          years: 1,
        })
        .toJSDate(),
    });
  }
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
  const [userDocCreated, setUserDocCreated] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setIsLoggedIn(loading ? cookies.isLoggedIn : !!currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function signupWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signinWithGoogle(isMobile: boolean) {
    if (isMobile) {
      return signInWithRedirect(auth, googleProvider);
    }
    return signInWithPopup(auth, googleProvider);
  }

  async function linkWithGoogle(isMobile: boolean) {
    if (!currentUser) {
      console.error("User DNE for linkWithGoogle");
      return;
    }
    if (isMobile) {
      await linkWithPopup(currentUser, googleProvider);
    } else {
      await linkWithRedirect(currentUser, googleProvider);
    }
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //TODO set loading to true either right before or right after signup
  function logout() {
    //setLoading(true);
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatePassword(password: string) {
    if (!currentUser) throw new Error("User doesn't exist");
    return fbUpdatePassword(currentUser, password);
  }
  async function onUserUpdate(user: User | null) {
    setCurrentUser(user);
    setLoading(false);
    onCookieChange(!!user);
    setIsLoggedIn(!!user);
  }

  async function unlinkProvider(user: User, providerId: string) {
    if (!user) {
      throw new Error("Calling unlink with no user");
    }
    const newUser = await unlink(user, providerId);
    await onUserUpdate({ ...newUser });
    return newUser;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      onUserUpdate(user);
      if (user) {
        createUserDocIfFirst(user, () => setUserDocCreated(!userDocCreated));
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    userDocCreated,
    currentUser,
    login,
    signupWithEmail,
    signinWithGoogle,
    unlinkProvider,
    linkWithGoogle,
    logout,
    resetPassword,
    updatePassword,
    loading,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
