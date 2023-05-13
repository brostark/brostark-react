import React, { ReactNode } from "react";
import { DefaultUser } from "../../lib/types/user";
interface AppProps {
    children?: ReactNode;
    afterLogin?: (uid: string, setUser: ((user: DefaultUser) => void)) => Promise<void>;
}
export declare const BrostarkProvider: React.FC<AppProps>;
export {};
//# sourceMappingURL=BrostarkProvider.d.ts.map