import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";

import { RouteOption } from "../../lib/types/routeOption";
import { AuthView, AuthViewProps } from "../../views/AuthView/AuthView";
import { AppContext } from "../../contexts/appContext";
import { RESERVED_ROUTES } from "../../constant";
import { LayoutProps, LayoutView } from "../../views";
import { NotFoundView } from "../../views/NotFoundView";


interface AppProps {
  appName: string;
  className?: string;
  children?: ReactNode;
  routes?: RouteOption[];
  authProps?: AuthViewProps;
  layoutProps?: LayoutProps;
}

export const BrostarkApp: React.FC<AppProps> = ({
  appName,
  children,
  className,
  authProps,
  layoutProps,
  routes = [],
}) => {
  const { setAppName } = useContext(AppContext);
  const location = useLocation();
  const [title, setTitle] = useState(appName);

  useEffect(() => {
    setAppName(appName);
  }, [appName, setAppName]);

  useEffect(() => {
    const activeRoute = routes.find(route => route.pathname === location.pathname);

    setTitle(`${appName}${activeRoute ? ` - ${activeRoute.title}` : ""}`);
  }, [appName, location, routes]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Routes>
        <Route path={RESERVED_ROUTES.LOGIN} element={<AuthView {...authProps} displayRegister={false} />} />
        <Route path={RESERVED_ROUTES.REGISTER} element={<AuthView {...authProps} displayRegister />} />
        <Route path={RESERVED_ROUTES.NOTFOUND} element={<NotFoundView />} />
        <Route path="/*" element={<LayoutView className={className} routes={routes} {...layoutProps} />} />
      </Routes>

      {children}
    </>
  )
};
