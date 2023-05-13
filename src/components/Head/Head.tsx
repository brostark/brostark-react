import { AppBar, Container, IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useContext } from "react";

import { styles } from "./head.styles";
import { Spacer } from "../Spacer/Spacer";
import { useState } from "react";
import { conditionalCss } from "../../helpers/utils";
import { useAuthentication } from "../../hooks/useAuthentication";
import { AppContext } from "../../contexts/appContext";
import { AuthContext } from "../../contexts/authContext";


interface HeadProps {
  drawerOpened?: boolean;
  onToggleDrawer: () => void;
}


export const Head: React.FC<HeadProps> = ({
  onToggleDrawer,
  drawerOpened,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<EventTarget & HTMLLIElement | null>(null);
  const { logout } = useAuthentication();
  const { user } = useContext(AuthContext);
  const { appName } = useContext(AppContext);

  const handleCloseMenu = () => setMenuAnchor(null);
  const handleOpenMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => setMenuAnchor(e.currentTarget);

  return (
    <AppBar
      position="fixed"
      className="appbar"
      elevation={1}
      css={[styles.appBar, conditionalCss(drawerOpened, styles.appBarOverlay)]}
    >
      <Container maxWidth={false} css={styles.container}>
        <Toolbar
          disableGutters
        >
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={onToggleDrawer}
            css={styles.burgerIconButton}
          >
            <div
              className={classNames({ opened: drawerOpened })}
              css={styles.burger}
            >
              <span />
              <span />
              <span />
            </div>
          </IconButton>

          <Spacer horizontal spacing={6} />

          <Typography variant="h4">{appName}</Typography>

          <div css={styles.headFill} />

          <div css={styles.headRight}>
            <ListItem
              aria-haspopup="true"
              onClick={handleOpenMenu}
              css={styles.listItemButton}
            >
              <ListItemButton>
                <ListItemText>{(user && user.email) || " "}</ListItemText>
              </ListItemButton>
            </ListItem>
            <Typography variant="caption"></Typography>

            <Menu
              keepMounted
              id="menu-appbar"
              open={!!menuAnchor}
              anchorEl={menuAnchor}
              onClose={handleCloseMenu}
              sx={{
                zIndex: 9999,
              }}
              PaperProps={{
                sx: {
                  marginTop: "2px",
                }
              }}
            >
              <MenuItem onClick={logout}>Déconnexion</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
