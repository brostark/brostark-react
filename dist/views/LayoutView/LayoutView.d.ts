import { SerializedStyles } from "@emotion/react";
import React from "react";
import { RouteOption } from "../../lib/types/routeOption";
export interface LayoutProps {
    disableBreadcrumbs?: boolean;
    disableHead?: boolean;
    disableDrawer?: boolean;
    className?: string;
    style?: SerializedStyles;
}
interface LayoutViewProps extends LayoutProps {
    routes: RouteOption[];
}
export declare const LayoutView: React.FC<LayoutViewProps>;
export {};
//# sourceMappingURL=LayoutView.d.ts.map