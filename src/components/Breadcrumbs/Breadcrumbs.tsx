import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { RouteOption } from "../../lib/types";
import { useLocation } from "react-router-dom";
import { BreadcrumbData, getBreadcrumbDatas } from "./breadcrumbs.utils";
import { styles } from "./breadcrumbs.styles";


interface BreadcrumbsProps {
  routes?: RouteOption[];
}


export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  routes = [],
}) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData[]>([]);

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbDatas(location.pathname, routes));
  }, [location, routes]);

  if (!routes.length) {
    return null;
  }

  return (
    <MuiBreadcrumbs css={styles.root} aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => {
        if (index === (breadcrumbs.length - 1)) {
          return <Typography>{breadcrumb.label}</Typography>;
        }

        return (
          <MuiLink
            component={Link}
            to={breadcrumb.pathname}
            underline="hover"
            color="inherit"
          >
            {breadcrumb.label}
          </MuiLink>
        )
      })}
    </MuiBreadcrumbs>
  );
};