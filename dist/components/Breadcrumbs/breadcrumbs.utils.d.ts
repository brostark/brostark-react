import { ChildRoute, RouteOption } from "../../lib/types";
export interface BreadcrumbData {
    label: string;
    pathname: string;
}
export declare const getBreadcrumbDatas: (pathname: string, routes: (RouteOption | ChildRoute)[], breadcrumbs?: BreadcrumbData[]) => BreadcrumbData[];
//# sourceMappingURL=breadcrumbs.utils.d.ts.map