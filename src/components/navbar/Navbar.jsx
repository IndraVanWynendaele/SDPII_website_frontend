import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "../../contexts/Auth.context";
import DrawerItems from "./DrawerItems";
import DrawerClientItems from "./DrawerClientItems";
import DrawerSupplierItems from "./DrawerSupplierItems";
import DrawerAdminItems from "./DrawerAdminItems";
import "../../css/navbar.css";

export const drawerWidth = 300;

export default function Navbar() {
  const { isAuthed, type } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box position="fixed" color="">
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon data-cy="nav" />
          </IconButton>
        </Toolbar>
      </Box>
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {!isAuthed ? (
            <DrawerItems />
          ) : type === "client" ? (
            <DrawerClientItems />
          ) : type === "supplier" ? (
            <DrawerSupplierItems />
          ) : (
            <DrawerAdminItems />
          )}
        </Drawer>
        <Drawer
          className="drawer"
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
          }}
          open
        >
          {!isAuthed ? (
            <DrawerItems />
          ) : type === "client" ? (
            <DrawerClientItems />
          ) : type === "supplier" ? (
            <DrawerSupplierItems />
          ) : (
            <DrawerAdminItems />
          )}
        </Drawer>
      </Box>
    </>
  );
}
