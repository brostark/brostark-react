/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useContext } from "react";
import firebase from "firebase/app";

import { AppContext } from "../contexts/appContext";
import { AuthContext } from "../contexts/authContext";


export const useAuthentication = () => {
  const {
    setIsLoading,
    setNotification,
  } = useContext(AppContext);
  const { user, removeUser, setUser } = useContext(AuthContext);

  const logout = useCallback(() => {
    firebase.auth().signOut();
    removeUser();
    setIsLoading(false);
  }, [setUser, setIsLoading]);

  const login = useCallback(async (email: string, password: string, rememberMe?: boolean) => {
    setIsLoading(true);

    try {
      await firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
      const userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (userCredential.user?.uid) {
        setUser(userCredential.user.uid);
      }
    } catch (err) {
      setNotification({ type: "error", message: `Impossible de se connecter: "${(err as Error).message}"`})
      logout();
    }
  }, [setIsLoading, logout]);

  const reloadUser = useCallback(async () => {
    if (user) {
      setUser(user.id);
    }
  }, [user]);

  const register = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const userCredential: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      if (!userCredential.user) {
        throw new Error("failed to create user");
      }

      setUser(userCredential.user.uid);
      setNotification({
        type: "success",
        message: "Inscription réussi avec succès. Bienvenue sur Riverealm !",
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: `Impossible de créer le compte: "${err}"`,
      });
    }

    setIsLoading(false);
  }

  return {
    login,
    logout,
    register,
    reloadUser,
  }
};
