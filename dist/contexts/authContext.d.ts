import React from "react";
import { Spec } from "immutability-helper";
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
export declare const AuthContext: React.Context<AuthProviderContext>;
export declare const AuthProvider: React.FC<AuthProviderProps>;
//# sourceMappingURL=authContext.d.ts.map