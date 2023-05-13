/* eslint-disable react-hooks/exhaustive-deps */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useContext } from "react";
import firebase from "firebase/app";
import { AppContext } from "../contexts/appContext";
import { AuthContext } from "../contexts/authContext";
export const useAuthentication = () => {
    const { setIsLoading, setNotification, } = useContext(AppContext);
    const { user, removeUser, setUser } = useContext(AuthContext);
    const logout = useCallback(() => {
        firebase.auth().signOut();
        removeUser();
        setIsLoading(false);
    }, [setUser, setIsLoading]);
    const login = useCallback((email, password, rememberMe) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        setIsLoading(true);
        try {
            yield firebase.auth().setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
            const userCredential = yield firebase.auth().signInWithEmailAndPassword(email, password);
            if ((_a = userCredential.user) === null || _a === void 0 ? void 0 : _a.uid) {
                setUser(userCredential.user.uid);
            }
        }
        catch (err) {
            setNotification({ type: "error", message: `Impossible de se connecter: "${err.message}"` });
            logout();
        }
    }), [setIsLoading, logout]);
    const reloadUser = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (user) {
            setUser(user.id);
        }
    }), [user]);
    const register = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const userCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
            if (!userCredential.user) {
                throw new Error("failed to create user");
            }
            setUser(userCredential.user.uid);
            setNotification({
                type: "success",
                message: "Inscription réussi avec succès. Bienvenue sur Riverealm !",
            });
        }
        catch (err) {
            setNotification({
                type: "error",
                message: `Impossible de créer le compte: "${err}"`,
            });
        }
        setIsLoading(false);
    });
    return {
        login,
        logout,
        register,
        reloadUser,
    };
};
