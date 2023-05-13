import { SerializedStyles } from "@emotion/react";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { Head } from "../../components/Head/Head";
import { MenuDrawer } from "../../components/MenuDrawer/MenuDrawer";
import { ProtectedRoute, ProtectedRouteProps } from "../../components/ProtectedRoute/ProtectedRoute";
import { RouteOption } from "../../lib/types/routeOption";
import { styles } from "./layoutView.styles";
import { DefaultUserRole } from "../../lib/types/user";


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


export const LayoutView: React.FC<LayoutViewProps> = ({
  style,
  routes,
  className,
  disableHead,
  disableDrawer,
  disableBreadcrumbs,
}) => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleToggleDrawer = () => setDrawerOpened(!drawerOpened);
  const handleCloseDrawer = () => setDrawerOpened(false);

  return (
    <>
      {!disableHead && (
        <Head
          drawerOpened={drawerOpened}
          onToggleDrawer={handleToggleDrawer}
        />
      )}

      {!disableDrawer && (
        <MenuDrawer
          routes={routes}
          opened={drawerOpened}
          onClose={handleCloseDrawer}
        />
      )}

      <main className={className} css={[styles.root, style]}>
        {!disableBreadcrumbs && <Breadcrumbs routes={routes} />}

        <Routes>
          {routes.map((route: RouteOption) => {
            const protectedRouteProps: ProtectedRouteProps = {
              role: undefined,
              connected: undefined,
            };

            if (typeof route.restriction === "undefined") {
              protectedRouteProps.connected = true;
            } else if (typeof route.restriction === "string") {
              protectedRouteProps.connected = true;
              protectedRouteProps.role = route.restriction as DefaultUserRole;
            } else if (!route.restriction) {
              protectedRouteProps.connected = false;
            }

            return (
              <React.Fragment key={route.pathname}>
                <Route
                  path={route.pathname}
                  element={(
                    <ProtectedRoute {...protectedRouteProps}>
                      {route.component}
                    </ProtectedRoute>
                  )}
                />

                {Array.isArray(route.children) && route.children.map((routeChild) => {
                  const pathname: string = `${route.pathname}${routeChild.pathname}`;
                  const key: string = `childroute-${pathname}`;

                  return (
                    <Route
                      key={key}
                      path={pathname}
                      element={(
                        <ProtectedRoute connected>
                          {routeChild.component}
                        </ProtectedRoute>
                      )}
                    />
                  );
                })}
              </React.Fragment>
            )
          })}
        </Routes>
      </main>
    </>
  );
}
