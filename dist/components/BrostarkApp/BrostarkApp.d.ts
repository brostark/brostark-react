import React, { ReactNode } from "react";
import { RouteOption } from "../../lib/types/routeOption";
import { AuthViewProps } from "../../views/AuthView/AuthView";
import { LayoutProps } from "../../views";
interface AppProps {
    appName: string;
    className?: string;
    children?: ReactNode;
    routes?: RouteOption[];
    authProps?: AuthViewProps;
    layoutProps?: LayoutProps;
}
export declare const BrostarkApp: React.FC<AppProps>;
export {};
//# sourceMappingURL=BrostarkApp.d.ts.map