var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import update from "immutability-helper";
import { AppContext } from "./appContext";
export const AuthContext = createContext({
    user: undefined,
    removeUser: () => { },
    updateUser: () => { },
    setUser: () => Promise.resolve(),
});
export const AuthProvider = ({ children, afterLogin: onAfterLogin, }) => {
    const { setIsLoading } = useContext(AppContext);
    const [user, setUserState] = useState(undefined);
    const setUser = useCallback((id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!id) {
            setUserState(undefined);
            return;
        }
        setIsLoading(true);
        const db = firebase.firestore();
        if (onAfterLogin) {
            yield onAfterLogin(id, setUserState);
        }
        else {
            const userSnapshot = yield db.collection("users").doc(id).get();
            const user = userSnapshot.data();
            setUserState(user);
        }
        setIsLoading(false);
    }), [setIsLoading, onAfterLogin]);
    const removeUser = () => setUser(undefined);
    const updateUser = (specs) => {
        if (user) {
            setUserState(update(user, specs));
        }
    };
    useEffect(() => {
        const auth = firebase.auth();
        const unsubscribe = auth.onAuthStateChanged((nextUser) => {
            if (nextUser && nextUser.uid) {
                setUser(nextUser.uid);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [setUser]);
    const value = {
        user,
        setUser,
        updateUser,
        removeUser,
    };
    return (_jsx(AuthContext.Provider, Object.assign({ value: value }, { children: children })));
};
