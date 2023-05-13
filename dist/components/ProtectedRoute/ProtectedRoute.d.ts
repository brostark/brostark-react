import React from "react";
import { DefaultUserRole } from "../../lib/types/user";
export interface ProtectedRouteProps {
    connected?: boolean;
    role?: DefaultUserRole;
    children?: React.ReactNode;
}
export declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
//# sourceMappingURL=ProtectedRoute.d.ts.map