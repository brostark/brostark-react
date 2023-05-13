import React from "react";
import { OnRegisterData } from "./RegisterForm";
export interface AuthViewProps {
    leftContent?: React.ReactNode;
    disableForgetPassword?: boolean;
    disableRegister?: boolean;
    displayRegister?: boolean;
    withUsername?: boolean;
    onRegister?: (data: OnRegisterData) => unknown;
}
export declare const AuthView: React.FC<AuthViewProps>;
//# sourceMappingURL=AuthView.d.ts.map