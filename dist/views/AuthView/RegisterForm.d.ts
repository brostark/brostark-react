import React from "react";
export interface OnRegisterData {
    email: string;
    password: string;
    username?: string;
}
interface RegisterFormProps {
    withUsername?: boolean;
    onRegister?: (data: OnRegisterData) => unknown;
}
export declare const RegisterForm: React.FC<RegisterFormProps>;
export {};
//# sourceMappingURL=RegisterForm.d.ts.map