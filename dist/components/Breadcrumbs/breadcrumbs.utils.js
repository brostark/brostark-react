export const getBreadcrumbDatas = (pathname, routes, breadcrumbs = []) => {
    let [, currentPath, ...restPath] = pathname.split("/");
    let activeRoute = routes.find((route) => route.pathname.includes(currentPath));
    const activeRouteWithParam = routes.find((route) => route.pathname.startsWith("/:"));
    if (!activeRoute && activeRouteWithParam) {
        activeRoute = Object.assign(Object.assign({}, activeRouteWithParam), { pathname: `/${currentPath}` });
    }
    if (!currentPath || !activeRoute) {
        return breadcrumbs;
    }
    const breadcrumbPathname = breadcrumbs.map((breadcrumbData) => breadcrumbData.pathname).join("");
    breadcrumbs.push({
        label: activeRoute.title,
        pathname: `${breadcrumbPathname}${activeRoute.pathname}`,
    });
    if (restPath.length > 0 && Array.isArray(activeRoute === null || activeRoute === void 0 ? void 0 : activeRoute.children) && activeRoute.children.length > 0) {
        return getBreadcrumbDatas(`/${restPath.join("/")}`, activeRoute.children, breadcrumbs);
    }
    return breadcrumbs;
};
