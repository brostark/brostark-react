import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import update, { Spec } from "immutability-helper";

import { AppContext } from "./appContext";
import { DefaultUser } from "../lib/types/user";


export interface AuthProviderProps {
  children?: React.ReactNode;
  afterLogin?: (uid: string, setUser: ((user: DefaultUser) => void)) => Promise<void>;
}


export interface AuthProviderContext {
  user?: DefaultUser;
  removeUser: () => void;
  setUser: (id: string) => Promise<void>;
  updateUser: (spec: Spec<DefaultUser, never>) => void;
}


export const AuthContext = createContext<AuthProviderContext>({
  user: undefined,
  removeUser: () => {},
  updateUser: () => {},
  setUser: () => Promise.resolve(),
});


export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  afterLogin: onAfterLogin,
}) => {
  const { setIsLoading } = useContext(AppContext);
  const [user, setUserState] = useState<DefaultUser | undefined>(undefined);

  const setUser = useCallback(async (id?: string) => {
    if (!id) {
      setUserState(undefined);
      return;
    }

    setIsLoading(true);

    const db = firebase.firestore();

    if (onAfterLogin) {
      await onAfterLogin(id, setUserState);
    } else {
      const userSnapshot = await db.collection("users").doc(id).get();
      const user: DefaultUser = userSnapshot.data() as DefaultUser;
  
      setUserState(user);
    }

    setIsLoading(false);
  }, [setIsLoading, onAfterLogin]);

  const removeUser = () => setUser(undefined);

  const updateUser = (specs: Spec<DefaultUser, never>) => {
    if (user) {
      setUserState(update(user, specs));
    }
  }

  useEffect(() => {
    const auth: firebase.auth.Auth = firebase.auth();

    const unsubscribe = auth.onAuthStateChanged((nextUser: firebase.User | null) => {
      if (nextUser && nextUser.uid) {
        setUser(nextUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUser]);

  const value: AuthProviderContext = {
    user,
    setUser,
    updateUser,
    removeUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
