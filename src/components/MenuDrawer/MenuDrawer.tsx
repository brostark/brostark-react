import { Box, List, ListItemButton, ListItemText, Drawer, SxProps, Theme, ListItemIcon } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DRAWER_WIDTH } from "../../constant";
import { HiddenRouteOption, RouteOption, VisibleRouteOption } from "../../lib/types/routeOption";


interface DrawerProps {
  opened?: boolean;
  routes: RouteOption[];
  onClose: () => void;
}

const styles: Record<string, SxProps<Theme>> = {
  box: {
    width: DRAWER_WIDTH,
  }
}

export const MenuDrawer: React.FC<DrawerProps> = ({
  routes,
  opened,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeLocation = location.pathname === "/";

  const createOnClickItem = (item: RouteOption) => () => {
    navigate(item.pathname);
    onClose();
  }

  return (
    <Drawer
      anchor="left"
      open={!!opened}
      onClose={onClose}
      PaperProps={{
        sx: {
          marginTop: '64px',
        }
      }}
    >
      <Box
        role="presentation"
        sx={styles.box}
      >
        <List>
          {routes
            .filter((item: RouteOption) => !(item as HiddenRouteOption).hidden)
            .map((item: RouteOption) => {
              item = item as VisibleRouteOption;
              const active: boolean = isHomeLocation ? item.pathname === location.pathname : item.pathname.includes(location.pathname);

              return (
                <ListItemButton
                  selected={active}
                  key={`drawer-${item.pathname}`}
                  onClick={createOnClickItem(item)}
                >
                  <ListItemIcon sx={{ color: item.color }}>
                    {active && <item.icon htmlColor={item.color} />}
                    {!active && <item.iconOutlined htmlColor={item.color} />}
                  </ListItemIcon>
                  <ListItemText sx={{ color: item.color }} primary={item.title} />
                </ListItemButton>
              );
            })}
        </List>
      </Box>
    </Drawer>
  )
};
