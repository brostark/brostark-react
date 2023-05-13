import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import { DefaultUserRole } from "./user";

export interface ChildRoute {
  title: string;
  pathname: string;
  exactPath?: boolean;
  children?: ChildRoute[];
  component: React.ReactNode;
  restriction?: false | DefaultUserRole;
}

export interface HiddenRouteOption extends ChildRoute {
  hidden: true;
}

export interface VisibleRouteOption extends ChildRoute {
  color?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  iconOutlined: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export type RouteOption = VisibleRouteOption | HiddenRouteOption;