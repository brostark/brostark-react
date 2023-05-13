import { ChildRoute, RouteOption } from "../../lib/types";


export interface BreadcrumbData {
  label: string;
  pathname: string;
}

export const getBreadcrumbDatas = (pathname: string, routes: (RouteOption | ChildRoute)[], breadcrumbs: BreadcrumbData[] = []): BreadcrumbData[] => {
  let [, currentPath, ...restPath] = pathname.split("/");
  let activeRoute: RouteOption | ChildRoute | undefined = routes.find((route) => route.pathname.includes(currentPath));
  const activeRouteWithParam: RouteOption | ChildRoute | undefined = routes.find((route) => route.pathname.startsWith("/:"));

  if (!activeRoute && activeRouteWithParam) {
    activeRoute = {
      ...activeRouteWithParam,
      pathname: `/${currentPath}`,
    }
  }

  if (!currentPath || !activeRoute) {
    return breadcrumbs;
  }

  const breadcrumbPathname = breadcrumbs.map((breadcrumbData) => breadcrumbData.pathname).join("");

  breadcrumbs.push({
    label: activeRoute.title,
    pathname: `${breadcrumbPathname}${activeRoute.pathname}`,
  });

  if (restPath.length > 0 && Array.isArray(activeRoute?.children) && activeRoute.children.length > 0) {
    return getBreadcrumbDatas(`/${restPath.join("/")}`, activeRoute.children, breadcrumbs);
  }

  return breadcrumbs;
};
